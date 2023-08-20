import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeNotificationsService } from '../../services/others/realtime-notifications.service';
import { ClassroomEnrollmentHttpService } from 'src/app/services/http/classroom-enrollment-http-service.service';
import { Classroom } from 'src/app/models/responseModels/Classroom';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private realtimeNotification: RealtimeNotificationsService,
    private classroomEnrollment: ClassroomEnrollmentHttpService,
    ){}

  isClassroomFound : boolean = false;
  isLoadingSpinnerOn: boolean = false;

  classroomFoundWithJoinCode : Classroom | null = null;

  isClassroomFoundError : boolean = false;
  classroomFoundErrorMessage : string | null = null;

  classroomFound(classroom : Classroom) : void{
    this.isLoadingSpinnerOn = false;
    this.classroomFoundWithJoinCode = classroom;
    this.isClassroomFound = true;
  }

  classroomFoundError(errorMessage: string) : void{
    this.isLoadingSpinnerOn = false;
    this.classroomFoundErrorMessage = errorMessage;
    this.isClassroomFoundError = true;
  }

  joinTheClassroomSubmit(joinCode: string){
    this.isLoadingSpinnerOn = true;
    this.isClassroomFound = false;
    this.classroomEnrollment.createClassroomEnrollment(joinCode)
    .subscribe(
    (response)=>{
      this.isLoadingSpinnerOn = false;
      this.isClassroomFound = false;
      this.realtimeNotification.joinGroup(response.classroomId.toString())
      this.router.navigate(["/main/classroom/"+response.classroomId.toString()])
    }, 
    (error)=>{
      this.isLoadingSpinnerOn = false;
      console.log(error)
    })
  }

  joinCodeEntered(){
    this.isLoadingSpinnerOn = true;
    this.isClassroomFoundError = false
  }

 }
