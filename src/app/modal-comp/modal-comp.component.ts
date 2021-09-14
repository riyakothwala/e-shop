import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../Product';

@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.scss']
})
export class ModalCompComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }
}
