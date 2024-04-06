import { Component } from '@angular/core';
import { Issue } from '../../shared/models/issue.model';
import { IssueService } from '../../shared/services/issue.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

// icons
import {
  IconDefinition,
  faPen,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../shared/models/columns.model';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    FontAwesomeModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    SearchPipePipe,
    ToggleButtonModule,
    TableModule,
    PaginatorModule,
  ],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent {
  issues: Issue[] = [];
  availableStatuses = ['Open', 'In Progress', 'Testing', 'Done'];
  IssuePriority = ['Low', 'Medium', 'High'];
  columns: TableColumn[] = [
    { key: 'title', label: 'Title', visible: true },
    { key: 'status', label: 'Status', visible: true },
  ];
  titleFieldValue: string = '';
  statusFieldValue: string = '';
  IssueDialog: boolean = false;
  issueForm!: FormGroup;

  trashIcon: IconDefinition = faTrashCan;
  updateIcon: IconDefinition = faPen;
  plusIcon: IconDefinition = faPlus;
  updateOrAddIssueModel: Issue | null = null;

  totalRecords!: number;
  rows: number = 8;
  first: number = 0;

  constructor(private issueService: IssueService) {
    this.initIssueForm();
  }

  ngOnInit(): void {
    this.fetchIssues();
  }

  initIssueForm() {
    this.issueForm = new FormGroup({
      assignee: new FormControl(this.updateOrAddIssueModel?.assignee, [
        Validators.required,
        Validators.email,
      ]),
      status: new FormControl(this.updateOrAddIssueModel?.status),
      priority: new FormControl(this.updateOrAddIssueModel?.priority),
      title: new FormControl(this.updateOrAddIssueModel?.title),
    });
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((issues) => {
      this.issues = issues;
      this.totalRecords = issues.length;
    });
  }

  showAddIssueDialog() {
    this.IssueDialog = true;
  }

  showUpdateIssueDialog(issue: Issue) {
    this.updateOrAddIssueModel = issue;
    this.issueForm.patchValue(this.updateOrAddIssueModel);
    this.IssueDialog = true;
  }
  onDialogHide() {
    this.updateOrAddIssueModel = null;
    this.issueForm.reset();
  }

  // submit form

  deleteIssue(issueId: number) {
    const confirmation = confirm(
      'Attention, By agreeing, you will delete this issue.'
    );
    if (confirmation) {
      this.issueService.deleteIssue(issueId).subscribe((res) => {
        console.log(res);
        this.fetchIssues();
      });
    }
  }

  updateIssue() {
    this.issueService
      .updateIssueStatus(this.issueForm.value, this.updateOrAddIssueModel!.id)
      .subscribe(
        (res: Issue) => {
          this.fetchIssues();
          this.IssueDialog = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addIssue() {
    this.issueService.addNewIssue(this.issueForm.value).subscribe((res) => {
      this.fetchIssues();
      this.IssueDialog = false;
    });
  }

  addOrUpdate() {
    if (this.updateOrAddIssueModel) {
      this.updateIssue();
    } else {
      this.addIssue();
    }
  }

  getValue(issue: Issue, key: string): any {
    return issue[key as keyof Issue];
  }

  // handling  pagination

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  sliceIssues(): Issue[] {
    return this.issues.slice(this.first, this.first + this.rows);
  }

  // handling issues visibility
  checkColumns() {
    const defaultAppear = this.columns.filter((x) => {
      return x.visible;
    });
    return defaultAppear.length > 0 ? true : false;
  }

  getStatusClass(column: TableColumn, status: string): any {
    if (column.key === 'status') {
      return {
        open: status === 'Open',
        testing: status === 'Testing',
        inProgress: status === 'In Progress',
        done: status === 'Done',
      };
    }
    return null;
  }
}
