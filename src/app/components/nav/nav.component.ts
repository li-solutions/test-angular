import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Constants } from '../../constants';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get canAccessPosts(): boolean {
    const postsRoute = this.router.config.find(
      (route) => route.path === 'posts'
    );
    const expectedRoles: Constants[] = postsRoute?.data?.['roles'];

    return this.authService.hasRole(expectedRoles);
  }

  get canAccessLogin(): boolean {
    return this.authService.getUserRole() === null;
  }
}
