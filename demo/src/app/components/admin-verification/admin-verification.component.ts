import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Donor {
  donorId: string;
  donorName: string;
  bloodGroup: string;
  donationDate: string;
  verified: boolean;
  certificateId: string;
}

@Component({
  selector: 'app-admin-verification',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.css']
})
export class AdminVerificationComponent implements OnInit {
  donors: Donor[] = [];
  verificationMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadDonors();
  }

  // Fetch all donors from backend
  loadDonors() {
    this.http.get<Donor[]>('http://localhost:8080/api/Certificate/certificates')
      .subscribe({
        next: donors => this.donors = donors,
        error: err => console.error('Error fetching donors', err)
      });
  }

  // Verify donor with admin key
 verifyDonor(donorId: string) {
  const adminKey = prompt('Enter Admin Key to verify donor:');
  if (!adminKey) return;

  this.http.post<Donor>(
    `http://localhost:8080/api/Certificate/verify/${donorId}?adminKey=${adminKey}`, 
    {}
  ).subscribe({
    next: updatedDonor => {

      const index = this.donors.findIndex(d => d.donorId === donorId);
      if (index !== -1) this.donors[index] = updatedDonor;

      this.verificationMessage = '✅ Donor verified successfully!';

      // 🔥 ADD THIS LINE
      this.router.navigate(['/certificate']);

    },
    error: err => {
      if (err.status === 403) {
        this.verificationMessage = '❌ Admin Key incorrect!';
      } else {
        this.verificationMessage = '❌ Failed to verify donor.';
      }
    }
  });
}
  getVerifiedCount(): number {
    return this.donors.filter(d => d.verified).length;
  }

  getUnverifiedCount(): number {
    return this.donors.filter(d => !d.verified).length;
  }
}