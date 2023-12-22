import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshippingaddrComponent } from './editshippingaddr.component';

describe('EditshippingaddrComponent', () => {
  let component: EditshippingaddrComponent;
  let fixture: ComponentFixture<EditshippingaddrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditshippingaddrComponent]
    });
    fixture = TestBed.createComponent(EditshippingaddrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
