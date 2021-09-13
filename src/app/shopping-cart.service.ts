import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartSource = new BehaviorSubject<Array<string>>([]);
  currentCart = this.cartSource.asObservable();

  constructor() { }

  changeCartData(newCart: string[]){
    this.cartSource.next(newCart)
  }
}
