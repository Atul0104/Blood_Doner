import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-share-now',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './share-now.html',
  styleUrl: './share-now.css'
})
export class ShareNow {
  awarenessForm: FormGroup;
  private apiUrl = 'http://localhost:8081/api/share'; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.awarenessForm = this.fb.group({
      yourName: ['', Validators.required],
      friendEmail: ['', [Validators.required, Validators.email]],
      customMessage: ['', [Validators.required, Validators.maxLength(40)]]
    });
  }

  onSubmit() {
    if (this.awarenessForm.valid) {
      this.http.post(this.apiUrl, this.awarenessForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Shared Successfully!',
            text: 'Thanks for helping spread awareness! 📢',
          });
          this.awarenessForm.reset();
        },
        error: (err) => {
          console.error('Error sharing awareness:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Share',
            text: 'Something went wrong. Please try again later.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please complete all fields correctly.',
      });
    }
  }
}
