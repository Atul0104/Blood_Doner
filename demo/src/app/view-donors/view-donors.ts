import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-donors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-donors.html'
})
export class ViewDonors {

  donors = [
    { name: 'Rahul', blood: 'A+', location: 'Pune', phone: '9876543210' },
    { name: 'Amit', blood: 'O+', location: 'Mumbai', phone: '9876543211' }
  ];

}