import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalCompComponent } from '../modal-comp/modal-comp.component';
import { Product } from '../Product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-checkout-buynow',
  templateUrl: './checkout-buynow.component.html',
  styleUrls: ['./checkout-buynow.component.scss']
})
export class CheckoutBuynowComponent implements OnInit {
  product!: Product;
  quantityPresent: number = 1;
  quantityToAddOrRemove: number = 1;
  productPrice:number=0;

  modalRef: any;

  constructor(private shoppingCart: ShoppingCartService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.shoppingCart.getProduct().subscribe(product=>{
      this.product=product;
    });
  }

  openModalWithProductDescription(product: Product) {
    const config: ModalOptions = {
      initialState: {
        "product": product, 
      }
    }
    this.modalRef = this.modalService.show(ModalCompComponent, config);
  }
  modifyItemCartQuantity() {
    this.quantityPresent = this.quantityToAddOrRemove;
  }
}
