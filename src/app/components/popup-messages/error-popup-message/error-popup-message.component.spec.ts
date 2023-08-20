import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPopupMessageComponent } from './error-popup-message.component';

describe('ErrorPopupMessageComponent', () => {
  let component: ErrorPopupMessageComponent;
  let fixture: ComponentFixture<ErrorPopupMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPopupMessageComponent]
    });
    fixture = TestBed.createComponent(ErrorPopupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
