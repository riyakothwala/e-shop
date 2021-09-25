import { Component, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import productList from '../../assets/data/products.json';
import { Product } from '../Product';
import { productOnCart } from '../productOnCart';
import { SearchDataService } from '../search-data.service';
import { TotalCostService } from '../total-cost.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ModalCompComponent } from '../modal-comp/modal-comp.component';
import { Observable, of } from 'rxjs';
import { NumberSymbol } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = productList;
  returnedProductList: Product[] = [];
  filteredProductList: Product[] = [];
  itemsPerPage = 12;
  searchText: string = '';
  cartSum: number = 0;
  cost: number = 0;
  modalRef!: BsModalRef;
  itemsOnCart: productOnCart[] = [];

  constructor(private searchDataService: SearchDataService, private costData: TotalCostService, private cartData: ShoppingCartService, private modalService: BsModalService) { }

  ngOnInit(): void {
    const startItem = 0;
    const endItem = this.itemsPerPage;
    productList.forEach((val: Product) => this.filteredProductList.push(Object.assign({}, val)));
    this.searchDataService.sharedMessage.subscribe(searchText => {
      this.searchText = searchText;
      if (searchText !== '') {
        this.filteredProductList = this.productList.filter((p: Product) => p.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      } else {
        productList.forEach((val: Product) => this.filteredProductList.push(Object.assign({}, val)));
      }
      this.returnedProductList = this.filteredProductList.slice(startItem, endItem);
    });
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum);
    this.costData.currentCost.subscribe(cost => this.cost = cost);
    this.cartData.cartC.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filteredProductList = changes.data.currentValue;
    if (this.filteredProductList) {
      this.returnedProductList = this.filteredProductList.slice(0, this.itemsPerPage);
    }
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedProductList = this.filteredProductList.slice(startItem, endItem);
  }

  addToCart(newPrice: number, newItem: Product, index: number) {
    //create tempProduct of type productOnCart
    let tempProduct: productOnCart = { title: "", type: "", description: "", filename: "", rating: 0, price: 0, quantity: 0 };
    let duplicateFound: boolean = false;

    //move relavent information from newItem to tempProduct
    tempProduct.title = newItem.title;
    tempProduct.type = newItem.type;
    tempProduct.description = newItem.description;
    tempProduct.filename = newItem.filename;
    tempProduct.rating = newItem.rating;
    tempProduct.price = newItem.price;
    
    if(this.itemsOnCart.length === 0){
      //if itemsOnCart array is empty, if true add first item
      tempProduct.quantity = 1;
      this.itemsOnCart.push(tempProduct);
    }else{
      //if itemsOnCart array is not empty check if new item is duplicate or new item

      //index through itemsOnCart array
      for (let index = 0; index < this.itemsOnCart.length; index++) {
        const element = this.itemsOnCart[index];
        
        if(element.title === newItem.title){
          //look for duplicate name from newItem if true set tempProduct.quantity to 1 + itemsOnCart.quantity
          this.itemsOnCart[index].quantity = element.quantity + 1;
          duplicateFound = true;
          break;
        }
      }

      //if no duplicates are found in for loop then set tempProduct.quantity to 1 and push to itemsOnCart array
      if(duplicateFound === false){
        tempProduct.quantity = 1;
          this.itemsOnCart.push(tempProduct);
      }
    }
    
    //reset cartSum to 0 to recalculate total cost of cart items
    this.cartSum = 0;

    //loop through itemsOnCart array and sum up the prices * quantities
    for (let index = 0; index < this.itemsOnCart.length; index++) {
      const element = this.itemsOnCart[index];
      this.cartSum += element.price * element.quantity;
    }

    //push new value for cartSum to service handler
    this.costData.changeCostTotal(this.cartSum);

    //sort items on cart array in alphebetical order and push to the service handeler
    this.itemsOnCart.sort((a, b) => (a.title > b.title) ? 1: -1); 
    this.cartData.addToCart(this.itemsOnCart);
  }

  buyNow(product: Product) {
    this.cartData.buyNow(product);
  }

  alertAddedToCart(){
    Swal.fire({
      position: 'bottom-left',
      icon: 'success',
      title: 'Item has been added to cart',
      showConfirmButton: false,
      timer: 1000,
      width: 200,
    })
  }
  
  openModalWithProductDescription(product: Product) {
    const config: ModalOptions = {
      initialState: {
        "product": product
      }
    }
    this.modalRef = this.modalService.show(ModalCompComponent, config);
    // this.modalRef.content.closeBtnName = 'Close';
  }
}
