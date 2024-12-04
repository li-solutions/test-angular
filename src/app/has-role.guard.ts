import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Constants } from './constants';
import { AuthService } from './auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const expectedRoles: Constants[] = route.data['roles'];
  const hasRole: boolean = inject(AuthService).hasRole(expectedRoles);

  return hasRole || router.navigate(['403']);
};
