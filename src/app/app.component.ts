import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './auth.service';
import { User } from '@firebase/auth';
import { UserRoles } from './constants';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.user$.subscribe(async (user: User) => {
      if (user) {
        this.authService.currentUser.set({
          email: user.email!,
          username: user.displayName!,
        });
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult.claims['role']);
        this.authService.userRole.set(
          idTokenResult.claims['role'] as UserRoles | null
        );
      } else {
        this.authService.currentUser.set(null);
      }
    });
  }

  title = 'test-angular';
}
