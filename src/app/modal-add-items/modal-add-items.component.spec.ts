import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddItemsComponent } from './modal-add-items.component';

describe('ModalAddItemsComponent', () => {
  let component: ModalAddItemsComponent;
  let fixture: ComponentFixture<ModalAddItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
