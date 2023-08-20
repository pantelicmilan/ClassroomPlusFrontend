import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classroom-member',
  templateUrl: './classroom-member.component.html',
  styleUrls: ['./classroom-member.component.css']
})
export class ClassroomMemberComponent {
  @Input() username: string = "";
  @Input() profileImageUrl : string ="";
}
