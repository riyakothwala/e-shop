import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutBuynowComponent } from './checkout-buynow/checkout-buynow.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';


const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'contactUs', component: ContactComponent },
  { path: 'shoppingCart', component: UserCartComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'buynow', component: CheckoutBuynowComponent},
  { path: 'checkoutCart', component: CheckoutCartComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
