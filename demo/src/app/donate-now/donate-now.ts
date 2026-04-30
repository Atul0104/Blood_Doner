import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donate-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './donate-now.html',
  styleUrls: ['./donate-now.css']
})
export class DonateNow implements OnInit {
  donateForm!: FormGroup;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  message = '';
  isEligible = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.donateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      weight: [null, [Validators.required, Validators.min(50)]],
      bloodGroup: ['', Validators.required],
      healthStatus: ['', Validators.required]
    });
  }

  checkEligibility(): void {
    if (this.donateForm.invalid) {
      this.donateForm.markAllAsTouched();
      this.message = '❌ Please fill all fields correctly.';
      this.isEligible = false;
      return;
    }

    const { name, age, weight, healthStatus, bloodGroup } = this.donateForm.value;

    this.isEligible = age >= 18 && age <= 65 && weight >= 50 && healthStatus === 'yes';
    this.message = this.isEligible
      ? `🎉 ${name}, you are eligible to donate blood!`
      : `❌ ${name}, you are not eligible to donate blood.`;

    if (this.isEligible) {
      const donorData = {
        donorId: 'D-' + Math.random().toString(36).substring(2, 10), // generate random ID
        donorName: name,
        bloodGroup: bloodGroup,
        donationDate: new Date().toISOString().split('T')[0], // today
        verified: false, // default
        certificateId: '' // backend will generate
      };

      this.http.post('http://localhost:8080/api/Certificate/certificate', donorData)
        .subscribe({
          next: () => {
            Swal.fire('Submitted', 'Your details were submitted successfully.', 'success');
            this.donateForm.reset();
          },
          error: (err) => {
            console.error('Submit error', err);
            Swal.fire('Error', 'Failed to submit — try again later.', 'error');
          }
        });
    } else {
      Swal.fire('Not eligible', this.message, 'error');
    }
  }
}