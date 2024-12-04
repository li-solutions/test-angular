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

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) throw new Error('No post id');

      this.postId = +id;
      this.fetchPost();
    });
  }

  private fetchPost(): void {
    if (!this.postId) throw new Error('No post id');

    this.dataService.getPostById(this.postId).subscribe({
      next: (data) => this.post.set(data),
      error: (error) => console.error('Error fetching data:', error),
    });
  }
}
