import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  showPassword: boolean = false;

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user'],
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value).subscribe({
        next: (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => alert('Signup failed'),
      });
    }
  }
}
