import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-health-check',
  imports: [RouterModule,CommonModule],
  templateUrl: './health-check.html',
  styleUrl: './health-check.css'
})
export class HealthCheck {

}
