import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../types';

@Component({
  selector: 'app-posts',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: WritableSignal<Post[]> = signal([]);
  errorMessage: WritableSignal<string | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);
  totalCount: WritableSignal<number> = signal(0);
  private _start: number = 0;
  private _limit: number = 20;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.loading.set(true);

    this.dataService
      .getPosts({
        _start: this._start.toString(),
        _limit: this._limit.toString(),
      })
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          this.posts.set([...this.posts(), ...(response.body ?? [])]);
          const total = response.headers.get('X-Total-Count');
          this.totalCount.set(total ? +total : 0);
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set('Failed to load posts');
          throw error;
        },
      });
  }

  loadMore(): void {
    this._start += this._limit;
    this.fetchPosts();
  }
}
