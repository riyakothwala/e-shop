import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  product!: Product;

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart.getProduct().subscribe(product=>{
      this.product=product;
    });
  }

}
