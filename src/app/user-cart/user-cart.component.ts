import { Component, OnInit, SimpleChange} from '@angular/core';

import { TotalCostService } from '../total-cost.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  cartSum: number = 0;
  cost: number = 0;
  zero: number = 0;
  itemsOnCart: string[] = [];

  constructor(private costData: TotalCostService, private cartData: ShoppingCartService) { }

  ngOnInit(): void {
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum)
    this.costData.currentCost.subscribe(cost => this.cost = cost)
    this.cartData.currentCart.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
  }

  addToCart(cost: number): void {
    this.cartSum = this.cartSum + cost;
  }

  clearCart() {
    this.costData.changeCostTotal(0);
    
    this.itemsOnCart = [];
    this.cartData.changeCartData(this.itemsOnCart);
  }

}
