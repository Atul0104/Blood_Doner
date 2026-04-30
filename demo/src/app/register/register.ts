import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [RouterModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
}