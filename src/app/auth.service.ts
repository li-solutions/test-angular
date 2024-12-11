import { inject, Injectable, signal, WritableSignal } from '@angular/core';
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
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$: Observable<User | null> = user(this.firebaseAuth);
  currentUser: WritableSignal<AuthUser | null | undefined> = signal(undefined);
  stateChangingIsLoading: WritableSignal<boolean> = signal(false);

  constructor() {
    this.user$.subscribe(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        this.currentUser.set({
          email: user.email!,
          username: user.displayName!,
          role: idTokenResult.claims['role'] as UserRoles | null,
        });
      } else {
        this.currentUser.set(null);
      }
    });
  }

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
    const role = this.currentUser()?.role;

    return (
      (this.currentUser() === null && expectedRoles.length === 0) ||
      (!!role && expectedRoles.includes(role))
    );
  }
}
