import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-checkout-buynow',
  templateUrl: './checkout-buynow.component.html',
  styleUrls: ['./checkout-buynow.component.scss']
})
export class CheckoutBuynowComponent implements OnInit {
  product!: Product;

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart.getProduct().subscribe(product=>{
      this.product=product;
    });
  }

}
