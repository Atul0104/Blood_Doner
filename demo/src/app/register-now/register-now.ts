import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './register-now.html',
  styleUrls: ['./register-now.css']
})
export class RegisterNow {
  registerForm: FormGroup;
  eligible = true;
  isSubmitting = false;

  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  // Check if form is being submitted
  get isFormSubmitting(): boolean {
    return this.isSubmitting;
  }

  // Get button state for template
  get isButtonDisabled(): boolean {
    return this.registerForm.invalid || this.isSubmitting;
  }

  // Get button tooltip message
  get buttonTooltip(): string {
    if (this.isSubmitting) {
      return 'Submitting...';
    }
    if (this.registerForm.invalid) {
      const invalidFields = this.getInvalidFields();
      return invalidFields.length > 0 ? `Please fill: ${invalidFields.join(', ')}` : 'Please complete the form';
    }
    return 'Register as a blood donor';
  }

  // Get list of invalid field names
  private getInvalidFields(): string[] {
    const invalid: string[] = [];
    const fieldLabels: { [key: string]: string } = {
      name: 'Name',
      age: 'Age',
      email: 'Email',
      phone: 'Phone',
      gender: 'Gender',
      bloodGroup: 'Blood Group',
      location: 'Location',
      password: 'Password'
    };

    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control?.invalid && control?.touched) {
        invalid.push(fieldLabels[key]);
      }
    });

    return invalid;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly.',
        confirmButtonColor: 'var(--burgundy)'
      });
      return;
    }

    this.isSubmitting = true;
    const form = this.registerForm.value;

    this.http.post('http://localhost:8080/api/register', form)
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: `${form.name}, thank you for registering as a blood donor.`,
            confirmButtonColor: 'var(--burgundy)'
          });
          console.log('Backend Response:', response);
          this.registerForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Backend Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.error?.message || 'Something went wrong. Please try again.',
            confirmButtonColor: 'var(--burgundy)'
          });
          this.isSubmitting = false;
        }
      });
  }
}
