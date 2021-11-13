import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../Product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  product!: Product;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Address: string = "";
  Country: string = "";
  State: string = "";
  Zip: string = "";
  PaymentMethod: string = "";
  NameOnCard: string = "";
  CardNumber: string = "";
  Expiration: string = "";
  Cvv: string = "";
  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart.getProduct().subscribe(product=>{
      this.product=product;
    });
  }
  submitUserMessage() {

    var userAlert: string = "";

    if(this.FirstName ==  ""){
      userAlert = "<li>First name is required.</li>";
    }

    if(this.LastName ==  ""){
      userAlert += "<li>Last name is required.</li>";
    }

    if(this.Email ==  ""){
      userAlert += "<li>Please enter a email address";
    }

    if(this.Address ==  ""){
      userAlert += "<li>Please enter your shipping address.";
    }

    if(this.Country ==  ""){
      userAlert += "<li>Please select country.";
    }

    if(this.State ==  ""){
      userAlert += "<li>Please select state.";
    }

    if(this.Zip ==  ""){
      userAlert += "<li>Please enter zip code.";
    }

    if(this.PaymentMethod ==  ""){
      userAlert += "<li>Please select Payment method.";
    }
    
    if(this.NameOnCard ==  ""){
      userAlert += "<li>Please enter the name same as on card.";
    }

    if(this.CardNumber ==  ""){
      userAlert += "<li>Please enter the payment card Number";
    }

    if(this.Expiration ==  ""){
      userAlert += "<li>Please enter the card expiration date";
    }

    if(this.Cvv ==  ""){
      userAlert += "<li>Please enter the CVV number";
    }
    
    if(this.FirstName != "" && this.LastName != "" && this.Email != "" && this.Address != "" && this.Country != ""
    && this.State != ""&& this.Zip != ""&& this.PaymentMethod != ""&& this.NameOnCard != ""&& this.CardNumber != ""
    && this.Expiration != ""&& this.Cvv != ""){
      userAlert = "Your order has been Placed successfully!";
      Swal.fire({
        title:'Status',
        html: '<div style="text-align : left"><h6>'+userAlert+'</h6></div>',
        icon: 'success', 
        width:500
      })
      userAlert = "Your order has been Placed successfully!";
    }else{
    Swal.fire({
      title:'Requirement',
      html: '<div style="text-align : left"><h6>'+userAlert+'</h6></div>',
      icon: 'error', 
      width:500
    })
  }
  }

}
