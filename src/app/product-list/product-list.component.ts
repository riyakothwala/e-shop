import { Component, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import productList from '../../assets/data/products.json';
import { Product } from '../Product';
import { SearchDataService } from '../search-data.service';
import { TotalCostService } from '../total-cost.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ModalCompComponent } from '../modal-comp/modal-comp.component';


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
  itemsOnCart: string[] = [];
  modalRef!: BsModalRef;

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
      console.log(this.filteredProductList.length);
    });
    this.costData.currentCostTotal.subscribe(cartSum => this.cartSum = cartSum)
    this.costData.currentCost.subscribe(cost => this.cost = cost)
    this.cartData.currentCart.subscribe(itemsOnCart => this.itemsOnCart = itemsOnCart)
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

  addToCart(newCost: number, newItem: string) {
    this.costData.changeCost(newCost);
    this.cartSum = this.cartSum + newCost;
    this.costData.changeCostTotal(this.cartSum);

    this.itemsOnCart.push(newItem);
    this.cartData.changeCartData(this.itemsOnCart);
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
