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
import { ModalAddItemsComponent } from '../modal-add-items/modal-add-items.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


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
  modalRef!: BsModalRef;
  itemsOnCart: productOnCart[] = [];

  constructor(private router: Router,private searchDataService: SearchDataService, private cartData: ShoppingCartService, private modalService: BsModalService) { }

  ngOnInit(): void {
    const startItem = 0;
    const endItem = this.itemsPerPage;
    productList.forEach((val: Product) => this.filteredProductList.push(Object.assign({}, val)));
    this.searchDataService.sharedMessage.subscribe(searchText => {
      this.searchText = searchText;
      if(searchText=='VegetableCategory'|| this.router.url.includes('/vegetables')) {
        this.filteredProductList = this.productList.filter((p: Product) => p.type.toLowerCase() === "vegetable");
      }
      else if(searchText=='FruitCategory'|| this.router.url.includes('/fruits')) {
        this.filteredProductList = this.productList.filter((p: Product) => p.type.toLowerCase() === "fruit");
      }
      else if(searchText=='DairyCategory'|| this.router.url.includes('/dairy')) {
        this.filteredProductList = this.productList.filter((p: Product) => p.type.toLowerCase() === "dairy");
      }
      else {
      if (searchText !== '') {
        this.filteredProductList = this.productList.filter((p: Product) => p.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      } else {
        productList.forEach((val: Product) => this.filteredProductList.push(Object.assign({}, val)));
      }
    }
      this.returnedProductList = this.filteredProductList.slice(startItem, endItem);
    });
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

  buyNow(product: Product) {
    this.cartData.buyNow(product);
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

  topScroll() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  openModalToAddItemsToCart(product: Product) {
    const config: ModalOptions = {
      initialState: {
        "product": product
      }, 
      class : 'modal-sm'
    }
    this.modalRef = this.modalService.show(ModalAddItemsComponent, config);
  }
}
