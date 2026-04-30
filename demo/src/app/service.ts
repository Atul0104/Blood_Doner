import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {
  cards=[
  { id:1 ,Title:'card:1',content:'first card',price:100},
  { id:2 ,Title:'card:2',content:'second card'},
  { id:3 ,Title:'card:3',content:'third card',price:100},
  { id:4 ,Title:'card:4',content:'four card'},
  { id:5 ,Title:'card:5',content:'five card',price:100},
  { id:6 ,Title:'card:6',content:'six card'},
 ];
 getProductById(id:number){
  return this.cards.find((card) => card.id === id );
 }
}
