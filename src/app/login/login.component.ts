import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Routes } from '../constants';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  errorMessage: WritableSignal<string | null> = signal(null);

  onSubmit() {
    this.errorMessage.set('');
    const rawForm = this.form.getRawValue();

    this.authService.stateChangingIsLoading.set(true);
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: async () => {
        await this.router.navigateByUrl(Routes.HOME);
        setTimeout(
          () => this.authService.stateChangingIsLoading.set(false),
          1000
        );
      },
      error: (error) => {
        this.authService.stateChangingIsLoading.set(false);
        this.errorMessage.set('Failed to login');
        throw error;
      },
    });
  }
}
