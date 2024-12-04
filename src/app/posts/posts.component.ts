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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPosts().subscribe({
      next: (data) => this.posts.set(data),
      error: (error) => this.handleError(error),
    });
  }

  private handleError(error: Error): void {
    this.errorMessage.set('Failed to load posts');
    throw error;
  }
}
