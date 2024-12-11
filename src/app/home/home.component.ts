import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { UserRoles } from '../constants';
import { DataService } from '../data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, NgIf, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  fb = inject(FormBuilder);
  dataService = inject(DataService);
  authService = inject(AuthService);
  errorMessage: WritableSignal<string | null> = signal(null);
  form = this.fb.nonNullable.group({
    uuid: ['', Validators.required],
    role: ['', Validators.required],
  });

  onSubmit() {
    this.errorMessage.set('');
    const rawForm = this.form.getRawValue();

    this.dataService
      .setUserRole(rawForm.uuid, rawForm.role as UserRoles)
      .subscribe({
        next: () => {
          alert('User role has successfully updated!');
        },
        error: (error) => {
          this.errorMessage.set('Failed to update user role');
          throw error;
        },
      });
  }

  protected readonly UserRoles = UserRoles;
}
