import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from './role';
import { AuthService } from './auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const expectedRoles: Role[] = route.data['roles'];
  const hasRole: boolean = inject(AuthService).hasRole(expectedRoles);

  return hasRole || router.navigate(['403']);
};
