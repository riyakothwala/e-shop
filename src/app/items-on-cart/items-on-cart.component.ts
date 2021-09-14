import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../Product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-items-on-cart',
  templateUrl: './items-on-cart.component.html',
  styleUrls: ['./items-on-cart.component.scss']
})
export class ItemsOnCartComponent implements OnInit {

  constructor(private cartData: ShoppingCartService, private cart: CartService) { }

  itemsOnCart: Product[] = [];

  ngOnInit(): void {
    this.cartData.cartC.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
  }

}
