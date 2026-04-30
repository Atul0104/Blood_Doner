import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterModule,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class ABOUT {
  selectedBenefit: string | null = null;

  toggleBenefit(benefit: string) {
    this.selectedBenefit = this.selectedBenefit === benefit ? null : benefit;
  }
}


