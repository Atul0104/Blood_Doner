import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Service } from '../service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
 Item:any;

 constructor(
  private route:ActivatedRoute,
  private service : Service 
 ) {}

 ngOnInit():void{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.Item = this.service.getProductById(id);
 }
}
