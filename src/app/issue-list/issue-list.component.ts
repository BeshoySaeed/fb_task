import { Component } from '@angular/core';
import { Issue } from '../issue.model';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent {
  issues: Issue[] = [];
  availableStatuses = ['Open', 'In Progress', 'Testing', 'Done'];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((issues) => {
      this.issues = issues;
    });
  }

  updateIssueStatus(issue: Issue, event: Event) {
    // 1. Update the issue in the UI (optimistically)
    // 2. Call issueService.updateIssueStatus(issue)
    // 3. Handle success/error, potentially revert the optimistic update
  }
}
