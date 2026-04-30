
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-join-team',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './join-team.html',
  styleUrls: ['./join-team.css']
})
export class JoinTeam {
  joinForm: FormGroup;
  submitted = false;
  backendUrl = 'http://localhost:8081/api/joinTeam'; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.joinForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      message: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.joinForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.joinForm.invalid) {
      this.joinForm.markAllAsTouched();
      return;
    }

    console.log('Form Data:', this.joinForm.value);

    this.http.post(this.backendUrl, this.joinForm.value).subscribe({
      next: () => {
        alert('✅ Your request has been submitted successfully!');
        this.joinForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to submit the form. Please try again.');
      }
    });
  }
}
