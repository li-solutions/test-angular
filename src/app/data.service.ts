import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, SearchParams } from './types';
import { buildUrlWithParams } from './utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(params: SearchParams = {}): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(
      buildUrlWithParams(this.postsUrl, '', params),
      { observe: 'response' }
    );
  }

  getPostById(id: number): Observable<HttpResponse<Post>> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url, { observe: 'response' });
  }
}
