import { Injectable } from '@angular/core';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: Constants | null = Constants.ADMIN; // Replace with a real API call

  constructor() {}

  getUserRole(): Constants | null {
    return this.userRole;
  }

  hasRole(expectedRoles: Constants[]): boolean {
    return (
      (this.userRole === null && expectedRoles.length === 0) ||
      (this.userRole !== null && expectedRoles.includes(this.userRole))
    );
  }
}
