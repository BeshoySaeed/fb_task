import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Issue } from '../models/issue.model';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/issues';

  constructor(private http: HttpClient) {}

  // handling Http errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  // crud operations

  getIssues(): Observable<Issue[]> {
    return this.http
      .get<Issue[]>(this.apiUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateIssueStatus(issue: Issue, issueId: number): Observable<any> {
    return this.http
      .patch<any>(`${this.apiUrl}/${issueId}`, issue)
      .pipe(retry(2), catchError(this.handleError));
  }

  addNewIssue(issue: Issue): Observable<Issue> {
    return this.http
      .post<Issue>(this.apiUrl, issue)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteIssue(issueId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${issueId}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
