import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import productList from '../../assets/data/products.json';
import { Product } from '../Product';
import { SearchDataService } from '../search-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productList: Product[] = productList;
  returnedProductList: Product[] = [];
  filteredProductList: Product[] = [];
  itemsPerPage = 12;
  searchText: string = '';

  constructor(private searchDataService: SearchDataService) { }

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
}
