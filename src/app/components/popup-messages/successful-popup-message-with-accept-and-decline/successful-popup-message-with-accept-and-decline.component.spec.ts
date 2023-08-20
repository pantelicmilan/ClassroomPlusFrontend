import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPopupMessageWithAcceptAndDeclineComponent } from './successful-popup-message-with-accept-and-decline.component';

describe('SuccessfulPopupMessageWithAcceptAndDeclineComponent', () => {
  let component: SuccessfulPopupMessageWithAcceptAndDeclineComponent;
  let fixture: ComponentFixture<SuccessfulPopupMessageWithAcceptAndDeclineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfulPopupMessageWithAcceptAndDeclineComponent]
    });
    fixture = TestBed.createComponent(SuccessfulPopupMessageWithAcceptAndDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
