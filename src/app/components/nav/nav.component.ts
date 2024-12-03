import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Role } from '../../role';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get canAccessDashboard(): boolean {
    const dashboardRoute = this.router.config.find(
      (route) => route.path === 'dashboard'
    );
    const expectedRoles: Role[] = dashboardRoute?.data?.['roles'];

    return this.authService.hasRole(expectedRoles);
  }

  get canAccessLogin(): boolean {
    return this.authService.getUserRole() === null;
  }
}
