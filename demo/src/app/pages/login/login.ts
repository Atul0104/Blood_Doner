import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuth } from '../../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  isLogin = true;
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private auth: UserAuth, private router: Router) {}

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.name = '';
    this.email = '';
    this.password = '';
    this.message = '';
  }

  submit() {
    if (!this.email || !this.password || (!this.isLogin && !this.name)) {
      this.message = 'Please fill all fields';
      return;
    }

    if (this.isLogin) {
      this.auth.login(this.email, this.password).subscribe({
        next: res => {
          Swal.fire('Login Successful', 'Welcome!', 'success').then(() => {
            this.router.navigate(['/home']);
          });
        },
        error: err => {
          this.message = err.error?.error || 'Login failed';
        }
      });
    } else {
      this.auth.signup(this.name, this.email, this.password).subscribe({
        next: res => {
          Swal.fire('Signup Successful', 'You can now login', 'success').then(() => {
            this.toggleForm();
          });
        },
        error: err => {
          this.message = err.error?.error || 'Signup failed';
        }
      });
    }
  }
}