import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecartComponent } from './managecart.component';

describe('ManagecartComponent', () => {
  let component: ManagecartComponent;
  let fixture: ComponentFixture<ManagecartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagecartComponent]
    });
    fixture = TestBed.createComponent(ManagecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
