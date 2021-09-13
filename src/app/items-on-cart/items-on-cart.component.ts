import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-items-on-cart',
  templateUrl: './items-on-cart.component.html',
  styleUrls: ['./items-on-cart.component.scss']
})
export class ItemsOnCartComponent implements OnInit {

  itemsOnCart: string[] = [];

  constructor(private cartData: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartData.currentCart.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
  }

}
