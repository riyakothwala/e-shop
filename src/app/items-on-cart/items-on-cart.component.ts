import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { productOnCart } from '../productOnCart';
import { CartService } from '../cart.service';
import { TotalCostService } from '../total-cost.service';
import { ModalCompComponent } from '../modal-comp/modal-comp.component';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Product } from '../Product';


@Component({
  selector: 'app-items-on-cart',
  templateUrl: './items-on-cart.component.html',
  styleUrls: ['./items-on-cart.component.scss']
})
export class ItemsOnCartComponent implements OnInit {
  modalRef: any;

  constructor(private cartData: ShoppingCartService, private cart: CartService, private costData: TotalCostService,private modalService: BsModalService) { }

  itemsOnCart: productOnCart[] = [];
  cartSum: number = 0;
  removeQuantity: number = 0;
  totalCostofProduct:number=0;

  ngOnInit(): void {
    this.cartData.cartC.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart);
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum);;
  }

  //this function will handle adding/removing items to/from shopping cart
  modifyItemCartQuantity(productTitle:string) {

    var cartSumTemp = 0;

    //index through array of items currently present on cart
    for (let index = 0; index < this.itemsOnCart.length; index++) {
      const element = this.itemsOnCart[index];
      
      //find item that maches the name we want to modify
      if(element.title == productTitle){
        
        //update quantity present on cart by adding/removing what is stored in quantity to add/remove data register
        this.itemsOnCart[index].quantityPresent = this.itemsOnCart[index].quantityToAddOrRemove;
        // +this.itemsOnCart[index].quantityPresent + +
        //bounds check for if quantity present goes below 0, if true set to 0
        if(this.itemsOnCart[index].quantityPresent < 0){
          this.itemsOnCart[index].quantityPresent = 0;
        }

        //update total cost of product to its new value as of removing some items from the cart
        this.itemsOnCart[index].totalProductCost = this.itemsOnCart[index].pricePerItem * this.itemsOnCart[index].quantityPresent;
        
        //loop through all the items on the cart again, this time we want to update the cart sum
        for (let index = 0; index < this.itemsOnCart.length; index++) {
          cartSumTemp = cartSumTemp + (this.itemsOnCart[index].pricePerItem * this.itemsOnCart[index].quantityPresent);
        }

        //update cartSum variable shared though angular service
        this.cartSum = cartSumTemp;

        //if the product on the cart now has a quantity of 0 remove it from the items on cart array
        if(element.quantityPresent <= 0){
          this.itemsOnCart.splice(index,1);
        }
      
      //end for loop early since there shouldn't be another product with the same name
      break;
      }
    }

    //push new value for cartSum to service handeler
    this.costData.changeCostTotal(this.cartSum);
    //push new items on cart array to service handeler
    this.cartData.addToCart(this.itemsOnCart);
  
  }

  openModalWithProductDescription(cartItem: productOnCart) {
    let product: Product = { title: cartItem.title, type: cartItem.type, description: cartItem.description, filename: cartItem.filename, rating: cartItem.rating, price: cartItem.pricePerItem, height: 0, width: 0 };

    const config: ModalOptions = {
      initialState: {
        "product": product, 
      }
    }
    this.modalRef = this.modalService.show(ModalCompComponent, config);

  }
}
