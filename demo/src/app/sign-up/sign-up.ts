import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  donorForm: FormGroup;
  private apiUrl = 'http://localhost:8081/api/Sign'; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.donorForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.donorForm.valid) {
      this.http.post(this.apiUrl, this.donorForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Thank you for becoming a donor and giving the gift of life ❤️',
          });
          this.donorForm.reset();
        },
        error: (err) => {
          console.error('Error saving donor:', err);
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'There was an issue registering. Please try again later.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out all fields correctly.',
      });
    }
  }
}
