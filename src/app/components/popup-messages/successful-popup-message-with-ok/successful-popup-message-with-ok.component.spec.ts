import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPopupMessageWithOkComponent } from './successful-popup-message-with-ok.component';

describe('SuccessfulPopupMessageWithOkComponent', () => {
  let component: SuccessfulPopupMessageWithOkComponent;
  let fixture: ComponentFixture<SuccessfulPopupMessageWithOkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfulPopupMessageWithOkComponent]
    });
    fixture = TestBed.createComponent(SuccessfulPopupMessageWithOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
