import { Injectable } from '@angular/core';
import { Role } from './role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: Role | null = Role.ADMIN; // Replace with a real API call

  constructor() {}

  getUserRole(): Role | null {
    return this.userRole;
  }

  hasRole(expectedRoles: Role[]): boolean {
    return (
      (this.userRole === null && expectedRoles.length === 0) ||
      (this.userRole !== null && expectedRoles.includes(this.userRole))
    );
  }
}
