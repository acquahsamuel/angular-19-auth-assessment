import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  user: any;
  loading = true;

  ngOnInit() {
    this.loading = true;
    this.auth.getProfile().subscribe({
      next: (response) => {
        this.user = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.auth.logout();
        this.router.navigate(['/login']);
      },
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
