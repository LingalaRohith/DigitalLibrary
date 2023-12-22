import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinuserComponent } from './loggedinuser.component';

describe('LoggedinuserComponent', () => {
  let component: LoggedinuserComponent;
  let fixture: ComponentFixture<LoggedinuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedinuserComponent]
    });
    fixture = TestBed.createComponent(LoggedinuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
