import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterModule,CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
 cards=[
  { id:1 ,Title:'card:1',content:'first card',price:100},
  { id:2 ,Title:'card:2',content:'second card'},
  { id:3 ,Title:'card:3',content:'third card',price:100},
  { id:4 ,Title:'card:4',content:'four card'},
  { id:5 ,Title:'card:5',content:'five card',price:100},
  { id:6 ,Title:'card:6',content:'six card'},
 ];
 constructor(private router :Router){}
  viewDetails(id:Number){
    this.router.navigate(['/details',id]);
  }
 } 
 

