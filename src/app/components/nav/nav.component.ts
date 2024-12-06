import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';
import { UserRoles } from '../../constants';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(public authService: AuthService, private router: Router) {}

  get canAccessPosts() {
    const postsRoute = this.router.config.find(
      (route) => route.path === 'posts'
    );
    const expectedRoles: UserRoles[] = postsRoute?.data?.['roles'];

    return this.authService.hasRole(expectedRoles);
  }

  logout() {
    this.authService.logout();
  }
}
