import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOnCartComponent } from './items-on-cart.component';

describe('ItemsOnCartComponent', () => {
  let component: ItemsOnCartComponent;
  let fixture: ComponentFixture<ItemsOnCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsOnCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsOnCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
