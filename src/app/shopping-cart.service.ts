import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { productOnCart } from './productOnCart';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartS = new BehaviorSubject<productOnCart[]>([])
  cartC = this.cartS.asObservable();

  constructor(private cart: CartService) { }

  addToCart(newCart: productOnCart[]){
    this.cartS.next(newCart);
  }

}
