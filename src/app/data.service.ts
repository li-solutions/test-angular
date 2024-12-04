import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostById(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url);
  }
}
