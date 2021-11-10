import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../Product';
import { productOnCart } from '../productOnCart';
import { TotalCostService } from '../total-cost.service';
import { ShoppingCartService } from '../shopping-cart.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-items',
  templateUrl: './modal-add-items.component.html',
  styleUrls: ['./modal-add-items.component.scss']
})
export class ModalAddItemsComponent implements OnInit {

  cartSum: number = 0;
  itemsOnCart: productOnCart[] = [];
  addQuantity: number = 0;

  @Input()
  product!: Product;

  constructor(private costData: TotalCostService, private cartData: ShoppingCartService ,public modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum);
    this.cartData.cartC.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
  }

  //function call will trigger a popup to notify user an item was added to the cart
  alertAddedToCart(){
    Swal.fire({
      position: 'top-right',
      title: 'successfully added the item',
      showConfirmButton: false,
      timer: 1000,
     width: 500
    })
  }

  //This function will handle adding items to the user's cart so they can be seen on the checkout page and increase the cart sum cost
  addToCart(newItem: Product, itemAddQuantity: number) {
    //create tempProduct of type productOnCart
    let tempProduct: productOnCart = { title: "", type: "", description: "", filename: "", rating: 0, pricePerItem: 0, quantityPresent: 0, quantityToAddOrRemove: 0, totalProductCost: 0 };
    let duplicateFound: boolean = false;
    var cartSumTemp = 0;

    //move relavent information from newItem to tempProduct
    tempProduct.title = newItem.title;
    tempProduct.type = newItem.type;
    tempProduct.description = newItem.description;
    tempProduct.filename = newItem.filename;
    tempProduct.rating = newItem.rating;
    tempProduct.pricePerItem = newItem.price;
    
    if(this.itemsOnCart.length == 0){
      //if itemsOnCart array is empty, add items equivalent to itemAddQuantity
      tempProduct.quantityPresent = itemAddQuantity;
      this.itemsOnCart.push(tempProduct);
    }else{
      //if itemsOnCart array is not empty check if new item is duplicate or new item

      //index through itemsOnCart array
      for (let index = 0; index < this.itemsOnCart.length; index++) {
        const element = this.itemsOnCart[index];
        
        if(element.title == newItem.title){
          //look for duplicate titles between newItem & element if true set itemsOnCart quantity present to itemsOnCart quantity present + itemAddQuantity
          this.itemsOnCart[index].quantityPresent = element.quantityPresent + itemAddQuantity;
          duplicateFound = true;
          break;
        }
      }

      //if no duplicates are found in for loop then set tempProduct.quantityPresent to itemAddQuantity and push to itemsOnCart array
      if(duplicateFound == false){
        tempProduct.quantityPresent = itemAddQuantity;
          this.itemsOnCart.push(tempProduct);
      }
    }
    
    //loop through all the items on the cart again, this time we want to update the cart sum
    for (let index = 0; index < this.itemsOnCart.length; index++) {
      cartSumTemp = cartSumTemp + (this.itemsOnCart[index].pricePerItem * this.itemsOnCart[index].quantityPresent);
    }

    //update cartSum variable shared though angular service
    this.cartSum = cartSumTemp;

    //push new value for cartSum to service handler
    this.costData.changeCostTotal(this.cartSum);

    //sort items on cart array in alphebetical order and push to the service handeler
    this.itemsOnCart.sort((a, b) => (a.title > b.title) ? 1: -1); 
    this.cartData.addToCart(this.itemsOnCart);

    //call function to notify user that their item has been added to the cart
    this.alertAddedToCart();
  }

}
