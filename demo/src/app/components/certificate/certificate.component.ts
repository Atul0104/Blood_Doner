import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Certificate {
  donorId: string;
  donorName: string;
  bloodGroup: string;
  donationDate: string;
  certificateId: string;
  verified: boolean;
}

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  certificates: Certificate[] = [];
  message: string = '';

  newCertificate: Certificate = {
    donorId: '',
    donorName: '',
    bloodGroup: '',
    donationDate: '',
    certificateId: '',
    verified: false
  };

  private baseUrl = 'http://localhost:8080/api/Certificate';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  // Load all certificates
  loadCertificates() {
    this.http.get<Certificate[]>(`${this.baseUrl}/certificates`)
      .subscribe({
        next: data => this.certificates = data,
        error: err => console.error('Error loading certificates', err)
      });
  }

  // Add certificate
  addCertificate() {
    this.http.post<Certificate>(`${this.baseUrl}/certificate`, this.newCertificate)
      .subscribe({
        next: (res) => {
          this.message = '✅ Certificate added successfully!';
          this.certificates.push(res);

          // Reset form
          this.newCertificate = {
            donorId: '',
            donorName: '',
            bloodGroup: '',
            donationDate: '',
            certificateId: '',
            verified: false
          };
        },
        error: () => this.message = '❌ Failed to add certificate.'
      });
  }

  // Verify certificate
  verifyCertificate(cert: Certificate) {
  this.http.post<Certificate>(`${this.baseUrl}/verify/${cert.donorId}`, {})
    .subscribe({
      next: (updatedCert) => {
        cert.verified = updatedCert.verified;
        cert.certificateId = updatedCert.certificateId;
        this.message = '✅ Certificate verified successfully!';
      },
      error: () => this.message = '❌ Failed to verify certificate.'
    });
}
  // Download certificate (Only verified allowed)
  downloadCertificate(donorId: string) {
  this.http.get(
    `${this.baseUrl}/certificate/download/${donorId}`,
    { responseType: 'blob' }
  ).subscribe({
    next: (response: Blob) => {

      if (response.size === 0) {
        this.message = "❌ Empty PDF received!";
        return;
      }

      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      window.open(url); // <-- This opens in new tab

    },
    error: (err) => {
      console.log(err);
      this.message = '❌ Download failed!';
    }
  });
}
}