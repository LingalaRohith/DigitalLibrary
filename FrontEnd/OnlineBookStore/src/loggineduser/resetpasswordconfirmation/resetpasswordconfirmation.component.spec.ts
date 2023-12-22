import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordconfirmationComponent } from './resetpasswordconfirmation.component';

describe('ResetpasswordconfirmationComponent', () => {
  let component: ResetpasswordconfirmationComponent;
  let fixture: ComponentFixture<ResetpasswordconfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetpasswordconfirmationComponent]
    });
    fixture = TestBed.createComponent(ResetpasswordconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
