import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Routes, UserRoles } from './constants';
import { AuthService } from './auth.service';
import { filter, Subscription } from 'rxjs';

export const hasRoleGuard: (route: ActivatedRouteSnapshot) => Subscription = (
  route
) => {
  const router: Router = inject(Router);
  const expectedRoles: UserRoles[] = route.data['roles'];
  const authService = inject(AuthService);

  return authService.user$
    .pipe(filter(() => authService.stateChangingIsLoading() !== true))
    .subscribe((user) => {
      return (
        authService.hasRole(expectedRoles) ||
        router.navigateByUrl(user ? Routes.UNAVAILABLE : Routes.SIGN_IN)
      );
    });
};
