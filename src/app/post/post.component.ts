import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../types';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  private postId: number | null = null;
  post: WritableSignal<Post | null> = signal(null);
  errorMessage: WritableSignal<string | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.handleError(new Error('No post id'));
        return;
      }

      this.postId = +id;
      this.fetchPost();
    });
  }

  private fetchPost() {
    if (!this.postId) {
      this.handleError(new Error('No post id'));
      return;
    }

    this.dataService.getPostById(this.postId).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.post.set(response.body);
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  private handleError(error: Error) {
    this.loading.set(false);
    this.errorMessage.set('Failed to load post');
    throw error;
  }
}
