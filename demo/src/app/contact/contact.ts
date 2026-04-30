import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Removed getContacts() to prevent automatic popup
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post(this.apiUrl, this.contactForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Thank you!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.contactForm.reset();
        },
        error: () => {
          Swal.fire({
            title: 'Oops!',
            text: 'Could not send your message. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      Swal.fire({
        title: 'Oops!',
        text: 'Please fill out all fields correctly.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  }
}