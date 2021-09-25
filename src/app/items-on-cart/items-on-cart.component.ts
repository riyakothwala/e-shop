import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { productOnCart } from '../productOnCart';
import { CartService } from '../cart.service';
import { TotalCostService } from '../total-cost.service';

@Component({
  selector: 'app-items-on-cart',
  templateUrl: './items-on-cart.component.html',
  styleUrls: ['./items-on-cart.component.scss']
})
export class ItemsOnCartComponent implements OnInit {

  constructor(private cartData: ShoppingCartService, private cart: CartService, private costData: TotalCostService) { }

  itemsOnCart: productOnCart[] = [];
  cartSum: number = 0;

  ngOnInit(): void {
    this.cartData.cartC.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart);
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum);;
  }

  //this function will handle removing items from shopping cart
  removeItemFromCart(productTitle:string) {

    //index through array and splice out any array cells that share the name with the product we want to remove
    for (let index = 0; index < this.itemsOnCart.length; index++) {
      const element = this.itemsOnCart[index];
      if(element.title === productTitle){
        this.cartSum -= element.price * element.quantity;
        this.itemsOnCart.splice(index,1);
      }
    }

    //push new value for cartSum to service handeler
    this.costData.changeCostTotal(this.cartSum);
    //push new items on cart array to service handeler
    this.cartData.addToCart(this.itemsOnCart);
  }
}
