import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  private searchText = new BehaviorSubject('');
  sharedMessage = this.searchText.asObservable();

  constructor() { }

  nextSearchText(searchText: string) {
    this.searchText.next(searchText);
  }
}
