import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../models/issue.model';

@Pipe({
  name: 'searchPipe',
  standalone: true,
})
export class SearchPipePipe implements PipeTransform {
  transform(
    value: Issue[] | null,
    title: string,
    status: string
  ): Issue[] | null {
    if (!value) {
      return null;
    }

    if (status === 'All') {
      status = '';
    }

    if (!title && !status) {
      return value;
    }

    let filteredArr = value.filter((issue: Issue) => {
      if (!title && status) {
        return issue.status === status;
      } else if (title && !status) {
        return issue.title.toLowerCase().includes(title.toLowerCase());
      } else {
        return (
          issue.status === status &&
          issue.title.toLowerCase().includes(title.toLowerCase())
        );
      }
    });

    return filteredArr;
  }
}
