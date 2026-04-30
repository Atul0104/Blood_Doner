import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-join-volunteer',
  standalone: true, // ✅ Important for standalone component
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './join-volunteer.html',
  styleUrl: './join-volunteer.css'
})
export class JoinVolunteer implements OnInit {
  volunteerForm!: FormGroup;
  volunteers: any[] = [];
  private apiUrl = 'http://localhost:8081/api/volunteer'; // ✅ Make sure backend matches

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.volunteerForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(65)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      city: ['', Validators.required],
      availability: ['', Validators.required],
      interest: ['', Validators.required]
    });

    this.getVolunteers();
  }

  getVolunteers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.volunteers = data;
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to load volunteers list.',
        });
      }
    });
  }

  onSubmit() {
    if (this.volunteerForm.valid) {
      console.log('Submitting data:', this.volunteerForm.value);

      this.http.post(this.apiUrl, this.volunteerForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Complete!',
            text: 'Thank you for volunteering ❤️',
          });
          this.volunteerForm.reset();
          this.getVolunteers();
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not register volunteer.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill all fields correctly.',
      });
    }
  }
}
