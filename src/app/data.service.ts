import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, SearchParams, User } from './types';
import { buildUrlWithParams } from './utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(params: SearchParams = {}): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      buildUrlWithParams(this.usersUrl, '', params),
      { observe: 'response' }
    );
  }

  getPosts(params: SearchParams = {}): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(
      buildUrlWithParams(this.postsUrl, '', params),
      {
        observe: 'response',
        transferCache: { includeHeaders: ['X-Total-Count'] },
      }
    );
  }

  getPostById(id: number): Observable<HttpResponse<Post>> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url, { observe: 'response' });
  }
}
