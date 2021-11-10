import { Component, OnInit, SimpleChange} from '@angular/core';

import { TotalCostService } from '../total-cost.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartService } from '../cart.service';
import { productOnCart } from '../productOnCart';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  cartSum: number = 0;
  cost: number = 0;
  zero: number = 0;
  itemsOnCart: productOnCart[] = [];

  constructor(private costData: TotalCostService, private cartData: ShoppingCartService, private cart: CartService) { }

  ngOnInit(): void {
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum)
    this.costData.currentCost.subscribe(cost => this.cost = cost)
    this.cartData.cartC.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
  }

  addToCart(cost: number): void {
    this.cartSum = this.cartSum + cost;
  }

  clearCart() {
    this.costData.changeCostTotal(0);

    this.itemsOnCart = [];
    this.cartData.addToCart(this.itemsOnCart);
  }

  //function will be used to move window back to the top when called
  movePageToTop() {
    window.scroll(0,0);
  }

}
