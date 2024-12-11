import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Routes } from '../constants';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
  errorMessage: WritableSignal<string | null> = signal(null);
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.errorMessage.set('');
    const rawForm = this.form.getRawValue();

    this.authService.stateChangingIsLoading.set(true);
    this.authService
      .register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: async () => {
          await this.router.navigateByUrl(Routes.HOME);
          this.authService.stateChangingIsLoading.set(false);
        },
        error: (error) => {
          this.authService.stateChangingIsLoading.set(false);
          this.errorMessage.set('Failed to register');
          throw error;
        },
      });
  }
}
