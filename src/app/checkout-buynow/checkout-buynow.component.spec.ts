import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBuynowComponent } from './checkout-buynow.component';

describe('CheckoutBuynowComponent', () => {
  let component: CheckoutBuynowComponent;
  let fixture: ComponentFixture<CheckoutBuynowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBuynowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutBuynowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
