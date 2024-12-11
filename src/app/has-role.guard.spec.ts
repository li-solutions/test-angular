import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { hasRoleGuard } from './has-role.guard';
import { Subscription } from 'rxjs';

describe('hasRoleGuard', () => {
  const executeGuard: (route: ActivatedRouteSnapshot) => Subscription = (
    ...guardParameters
  ) => TestBed.runInInjectionContext(() => hasRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
