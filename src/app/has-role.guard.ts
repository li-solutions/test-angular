import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoles } from './constants';
import { AuthService } from './auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const expectedRoles: UserRoles[] = route.data['roles'];
  const hasRole = inject(AuthService).hasRole(expectedRoles);

  return hasRole || router.navigate(['403']);
};
