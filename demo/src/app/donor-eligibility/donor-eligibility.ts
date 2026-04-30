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

  donor!: FormGroup;
  backendUrl = 'http://localhost:8080/api/eligibility'; 

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.donor = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.max(65)]],
      weight: ['', [Validators.required, Validators.maxLength(100)]],
      eligibilityCheck: [false, [Validators.requiredTrue, Validators.maxLength(20)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.donor.controls;
  }

  onSubmit(): void {
    if (this.donor.invalid) {

      this.donor.markAllAsTouched();
      return;
    }

    this.http.post(this.backendUrl, this.donor.value).subscribe({
      next: (res) => {
        alert('✅ Eligibility form submitted successfully!');
        this.donor.reset();
      },
      error: (err) => {
        alert('❌ Failed to submit form. Please try again.');
        console.error(err);
      }
    });
  }
}
