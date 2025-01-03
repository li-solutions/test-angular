import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DataService } from '../data.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post, User } from '../types';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-posts',
  imports: [NgFor, NgIf, RouterLink, FormsModule, ButtonModule, Select],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: WritableSignal<Post[]> = signal([]);
  postsErrorMessage: WritableSignal<string | null> = signal(null);
  postsAreLoading: WritableSignal<boolean> = signal(true);
  postsTotalCount: WritableSignal<number> = signal(0);
  users: WritableSignal<User[]> = signal([]);
  usersErrorMessage: WritableSignal<string | null> = signal(null);
  usersAreLoading: WritableSignal<boolean> = signal(true);
  selectedUserId: WritableSignal<string> = signal('');
  userOptions: WritableSignal<{ value: string; label: string }[]> = signal([
    { value: '', label: 'Select user' },
  ]);
  private postsStartIndex: number = 0;
  private postsLimit: number = 20;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const userIdFromUrl = params.get('userId');

      this.selectedUserId.set(userIdFromUrl || '');
      this.posts.set([]);
      this.postsStartIndex = 0;
      this.fetchPosts();
    });

    this.fetchUsers();
  }

  private fetchPosts() {
    this.postsAreLoading.set(true);

    this.dataService
      .getPosts({
        _start: this.postsStartIndex.toString(),
        _limit: this.postsLimit.toString(),
        userId: this.selectedUserId(),
      })
      .subscribe({
        next: (response) => {
          this.postsAreLoading.set(false);
          this.posts.update((posts) => [...posts, ...(response.body ?? [])]);
          const total = response.headers.get('X-Total-Count');
          this.postsTotalCount.set(total ? +total : 0);
        },
        error: (error) => {
          this.postsAreLoading.set(false);
          this.postsErrorMessage.set('Failed to load posts');
          throw error;
        },
      });
  }

  loadMorePosts() {
    this.postsStartIndex += this.postsLimit;
    this.fetchPosts();
  }

  filterPosts() {
    const userId = this.selectedUserId();

    if (userId) {
      this.router.navigate([], {
        queryParams: { userId },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        queryParams: { userId: null },
        queryParamsHandling: 'merge',
      });
    }
  }

  private fetchUsers() {
    this.usersAreLoading.set(true);

    this.dataService.getUsers().subscribe({
      next: (response) => {
        this.usersAreLoading.set(false);
        this.users.set(response.body ?? []);
        this.userOptions.update((value) => [
          ...value,
          ...this.users().map((user) => ({
            value: user.id.toString(),
            label: user.name,
          })),
        ]);
      },
      error: (error) => {
        this.usersAreLoading.set(false);
        this.usersErrorMessage.set('Failed to load posts');
        throw error;
      },
    });
  }
}
