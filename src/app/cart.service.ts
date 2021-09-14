import { Injectable } from '@angular/core';

import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Product[] = [];

  constructor() { }
  
  addToCart(newCart: Product) {
    this.cart.push(newCart);
  }

  clearCart(){
    this.cart = [];
  }
}
