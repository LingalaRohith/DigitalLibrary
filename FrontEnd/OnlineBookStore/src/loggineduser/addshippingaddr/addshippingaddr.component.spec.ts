import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshippingaddrComponent } from './addshippingaddr.component';

describe('AddshippingaddrComponent', () => {
  let component: AddshippingaddrComponent;
  let fixture: ComponentFixture<AddshippingaddrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddshippingaddrComponent]
    });
    fixture = TestBed.createComponent(AddshippingaddrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
