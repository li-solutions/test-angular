import {
  Component,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
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

  ngOnInit(): void {
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

  private fetchPost(): void {
    if (!this.postId) {
      this.handleError(new Error('No post id'));
      return;
    }

    this.dataService.getPostById(this.postId).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.post.set(data);
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  private handleError(error: Error): void {
    this.loading.set(false);
    this.errorMessage.set('Failed to load post');
    throw error;
  }
}
