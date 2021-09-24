import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { productOnCart } from './productOnCart';
import { CartService } from './cart.service';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public product!: Product;
  private buyProduct = new BehaviorSubject<Product>(this.product);

  private cartS = new BehaviorSubject<productOnCart[]>([])
  cartC = this.cartS.asObservable();

  constructor(private cart: CartService) { }

  getProduct() {
    return this.buyProduct.asObservable();
  }

  addToCart(newCart: productOnCart[]){
    this.cartS.next(newCart);
  }

  buyNow(product: Product) {
    this.product = product;
    this.buyProduct.next(product);
  }
}
