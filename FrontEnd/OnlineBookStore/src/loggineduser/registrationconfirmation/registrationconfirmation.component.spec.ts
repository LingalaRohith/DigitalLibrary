import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationconfirmationComponent } from './registrationconfirmation.component';

describe('RegistrationconfirmationComponent', () => {
  let component: RegistrationconfirmationComponent;
  let fixture: ComponentFixture<RegistrationconfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationconfirmationComponent]
    });
    fixture = TestBed.createComponent(RegistrationconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
