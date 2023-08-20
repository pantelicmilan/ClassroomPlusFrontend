import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-popup-message',
  templateUrl: './error-popup-message.component.html',
  styleUrls: ['./error-popup-message.component.css']
})
export class ErrorPopupMessageComponent {
  @Input() errorHeading = "";
  @Input() errorContent = "";
  @Output() isPopupClosed : EventEmitter<boolean> = new EventEmitter<boolean>();

  closePopup(){
    this.isPopupClosed.emit(false);
  }
}
