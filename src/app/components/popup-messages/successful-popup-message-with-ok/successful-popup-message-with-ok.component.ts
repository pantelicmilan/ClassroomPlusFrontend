import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-successful-popup-message-with-ok',
  templateUrl: './successful-popup-message-with-ok.component.html',
  styleUrls: ['./successful-popup-message-with-ok.component.css']
})
export class SuccessfulPopupMessageWithOkComponent {
  @Output() okClicked : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() messageHeading : string =  "";
  @Input() messageSubheading : string =  "";
  @Input() messageContent : string =  "";

  okClick() : void {
    this.okClicked.emit(true);
  }
}
