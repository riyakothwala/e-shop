import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from './Product';
import { CartService } from './cart.service';
import productList from '../assets/data/products.json';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  private item: Product = {title: '',type: '',description: '', filename: '', height: 0, width: 0, price: 0, rating: 0};

  private cartS = new BehaviorSubject<Product[]>([])
  cartC = this.cartS.asObservable();

  private itemNameS = new BehaviorSubject<string>('');
  itemNameC = this.itemNameS.asObservable();

  private itemTypeS = new BehaviorSubject<string>('');
  itemTypeC = this.itemTypeS.asObservable();

  private itemDiscS = new BehaviorSubject<string>('');
  itemDiscC = this.itemDiscS.asObservable();

  private itemFileS = new BehaviorSubject<string>('');
  itemFileC = this.itemFileS.asObservable();

  private itemHeightS = new BehaviorSubject<number>(0);
  itemHeightC = this.itemHeightS.asObservable();

  private itemWidthS = new BehaviorSubject<number>(0);
  itemWidthC = this.itemWidthS.asObservable();

  private itemPriceS = new BehaviorSubject<number>(0);
  itemPriceC = this.itemPriceS.asObservable();

  private itemRateS = new BehaviorSubject<number>(0);
  itemRateC = this.itemRateS.asObservable();

  constructor(private cart: CartService) { }

  newItemSelected(newName: string, newType: string, newDisc: string, newFile: string, newHeight: number, newWidth: number, newPrice: number, newRate: number) {
    this.itemNameS.next(newName);
    this.itemTypeS.next(newType);
    this.itemDiscS.next(newDisc);
    this.itemFileS.next(newFile);
    this.itemHeightS.next(newHeight);
    this.itemWidthS.next(newWidth);
    this.itemPriceS.next(newPrice);
    this.itemRateS.next(newRate);
    
    this.item.title = newName;
    this.item.type = newType;
    this.item.description = newDisc;
    this.item.filename = newFile;
    this.item.height = newHeight;
    this.item.width = newWidth;
    this.item.price = newPrice;
    this.item.rating = newRate;

    this.cart.addToCart(this.item);
  }

  addToCart(newCart: Product[]){
    this.cartS.next(newCart);
  }

}
