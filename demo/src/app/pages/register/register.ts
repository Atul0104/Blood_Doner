import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  user: User = { name: '', email: '', password: '' };
  message: string = '';
  isLoading: boolean = false;

  private apiUrl = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.message = '❌ All fields are required!';
      return;
    }

    this.isLoading = true;
    this.http.post<User>(this.apiUrl, this.user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = '✅ Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 409) {
          this.message = '❌ Email already exists!';
        } else {
          this.message = '❌ Registration failed!';
        }
      }
    });
  }
}