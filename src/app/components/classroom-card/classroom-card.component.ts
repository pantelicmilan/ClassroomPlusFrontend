import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classroom-card',
  templateUrl: './classroom-card.component.html',
  styleUrls: ['./classroom-card.component.css']
})
export class ClassroomCardComponent {
  @Input() classroomName : string = "";
  @Input() classroomId : number = 0;
  @Input() classroomJoinCode : string = "";
  @Input() classroomOwnerUsername : string = "";

  constructor(private router: Router){}

  classroomCardClick() : void {
    this.router.navigate([`/main/classroom/${this.classroomId}`])
  }

}
