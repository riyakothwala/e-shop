import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { ItemsOnCartComponent } from './items-on-cart/items-on-cart.component';
import { ModalCompComponent } from './modal-comp/modal-comp.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutBuynowComponent } from './checkout-buynow/checkout-buynow.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    CarouselComponent,
    ContactComponent,
    CategoriesComponent,
    UserCartComponent,
    ItemsOnCartComponent,
    ModalCompComponent,
    CheckoutComponent,
    CheckoutBuynowComponent,
    CheckoutCartComponent
  ],
  imports: [
    BrowserModule, ModalModule.forRoot(), PaginationModule.forRoot(), FormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalCompComponent]
})
export class AppModule { }
