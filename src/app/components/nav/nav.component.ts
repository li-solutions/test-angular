import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Routes, UserRoles } from '../../constants';

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
    this.authService.stateChangingIsLoading.set(true);
    this.authService.logout().subscribe({
      next: async () => {
        await this.router.navigateByUrl(Routes.HOME);
        setTimeout(
          () => this.authService.stateChangingIsLoading.set(false),
          1000
        );
      },
    });
  }

  protected readonly Routes = Routes;
}
