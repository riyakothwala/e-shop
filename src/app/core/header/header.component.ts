import { Component, OnInit } from '@angular/core';
import { SearchDataService } from '../../search-data.service';
import { ShoppingCartService } from '../../shopping-cart.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText: string = '';
  public totalItem : number = 0;
  constructor(private searchDataService: SearchDataService,private ShoppingCartService : ShoppingCartService) { }

  ngOnInit(): void {
    // this.searchDataService.sharedMessage.subscribe(searchText => this.searchText = searchText)
    this.ShoppingCartService.cartC.subscribe
    (res=>{
      this.totalItem = res.length;
    })

  }
  public category(category: string,elementId: string) {
    this.searchDataService.nextSearchText(category);
    this.scroll(elementId);
  }
  
  public newSearchText(elementId: string) {
    this.searchDataService.nextSearchText(this.searchText);
    this.scroll(elementId);
  }

  private scroll(elementId: string): void {
    const elementList = document.querySelectorAll('#' + elementId);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}