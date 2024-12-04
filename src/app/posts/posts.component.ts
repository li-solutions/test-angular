import {
  Component,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { DataService } from '../data.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../types';

@Component({
  selector: 'app-posts',
  imports: [NgFor, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: WritableSignal<Post[]> = signal([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPosts().subscribe({
      next: (data) => this.posts.set(data),
      error: (error) => console.error('Error fetching data:', error),
    });
  }
}
