import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-donor-eligibility',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './donor-eligibility.html',
  styleUrls: ['./donor-eligibility.css']
})
export class DonorEligibility implements OnInit {

  donorForm!: FormGroup;
  backendUrl = 'http://localhost:8080/api/donor/eligibility'; // Change to your API URL
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.donorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      weight: ['', [Validators.required, Validators.min(50)]],
      eligibilityCheck: [false, [Validators.requiredTrue]]
    });
  }

  // Helper for easy access to form controls in HTML
  get f(): { [key: string]: AbstractControl } {
    return this.donorForm.controls;
  }

  onSubmit(): void {
    if (this.donorForm.invalid) {
      this.message = 'Please fill the form correctly before submitting.';
      return;
    }

    // Send to backend
    this.http.post(this.backendUrl, this.donorForm.value).subscribe({
      next: (response) => {
        this.message = '✅ Eligibility form submitted successfully!';
        this.donorForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ Failed to submit the form. Please try again later.';
      }
    });
  }
}
