import { Component, OnInit, SimpleChange} from '@angular/core';

import { TotalCostService } from '../total-cost.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  cartSum: number = 0;
  cost: number = 0;
  zero: number = 0;

  constructor(private costData: TotalCostService) { }

  ngOnInit(): void {
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum)
    this.costData.currentCost.subscribe(cost => this.cost = cost)
  }

  addToCart(cost: number): void {
    this.cartSum = this.cartSum + cost;
  }

  resetCartSum() {
    this.costData.changeCostTotal(0);
  }

}
