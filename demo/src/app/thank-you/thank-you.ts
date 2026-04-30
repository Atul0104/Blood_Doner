import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CertificateComponent } from '../components/certificate/certificate.component';

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule, RouterLink, CertificateComponent],
  templateUrl:'./thank-you.html',
  styleUrl: './thank-you.css'
})
export class ThankYou {
  donorId: string = '1'; // Demo donor ID - can be passed from donation form

  constructor(private router: Router) {
    console.log('[Thank You Page] Initialized with donorId:', this.donorId);
  }

onSubmit(event: Event) {
  event.preventDefault();

  Swal.fire({
    title: 'Thank you!',
    text: 'Your donation request has been submitted.',
    icon: 'success',
    confirmButtonText: 'Go to Thank You Page'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/thank-you']);
    }
  });
}

}
