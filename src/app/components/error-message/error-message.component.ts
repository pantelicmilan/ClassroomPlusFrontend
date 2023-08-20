import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() errorType : string = "Login";
  @Input() errorContent : string = "Error with server";

  @Output() errorMessageFalseEvent = new EventEmitter<boolean>();

  errorMessageFalse() : void {
    this.errorMessageFalseEvent.emit(false);
  }
}
