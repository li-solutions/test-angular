import { inject, Injectable, signal } from '@angular/core';
import { UserRoles } from './constants';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { AuthUser } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUser = signal<AuthUser | null | undefined>(undefined);
  userRole = signal<UserRoles | null>(null);

  constructor() {}

  register(
    email: string,
    userName: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: userName })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);

    return from(promise);
  }

  hasRole(expectedRoles: UserRoles[]) {
    const role = this.userRole();

    return (
      (role === null && expectedRoles.length === 0) ||
      (role !== null && expectedRoles.includes(role))
    );
  }
}
