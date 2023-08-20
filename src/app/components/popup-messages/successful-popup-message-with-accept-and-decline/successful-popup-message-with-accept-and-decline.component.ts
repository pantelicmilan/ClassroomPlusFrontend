import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-successful-popup-message-with-accept-and-decline',
  templateUrl: './successful-popup-message-with-accept-and-decline.component.html',
  styleUrls: ['./successful-popup-message-with-accept-and-decline.component.css']
})
export class SuccessfulPopupMessageWithAcceptAndDeclineComponent {
  @Output() acceptClicked : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() declineClicked : EventEmitter<boolean> = new EventEmitter<boolean>(); 

  @Input() messageHeading: string = "";
  @Input() messageSubheading: string ="";
  @Input() messageContent: string = "";
  @Input() acceptButtonContent: string ="";
  @Input() declineButtonContent: string =" ";

  acceptClick() : void {
    this.acceptClicked.emit(true);
  }

  declineClick() : void {
    this.declineClicked.emit(true);
  }

}
