import { Component, OnInit } from '@angular/core';
import { SearchDataService } from '../../search-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText: string = '';

  constructor(private searchDataService: SearchDataService) {  }

  ngOnInit(): void {
    // this.searchDataService.sharedMessage.subscribe(searchText => this.searchText = searchText)
  }

  public newSearchText() {
    this.searchDataService.nextSearchText(this.searchText)
  }
}