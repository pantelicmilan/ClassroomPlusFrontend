import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomRoutingService } from '../../services/others/custom-routing.service';
import { CriticalErrorSnapshotService } from '../../services/others/critical-error-snapshot.service';
import { UserHttpService } from 'src/app/services/http/user-http-service.service';
import { User } from 'src/app/models/responseModels/User';
import { ClassroomHttpService } from 'src/app/services/http/classroom-http-service.service';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent {

  private readonly minimumClassroomNameLength : number = 5;
  private readonly maximumClassroomNameLength : number = 16;

  classroomNameFieldText : string = '';

  createdClassroomName : string = ""
  isClassroomCreatedWithoutErrors : boolean = false;
  currentUserInfo: User | null = null;
  isPageLoading: boolean = true;

  isLoadingSpinnerOn: boolean = false; 

  isErrorWithCreatingClassroom: boolean = false;
  errorWithCreatingClassroomHeading: string = "Error with creating classroom";
  errorWithCreatingClassroomContent: string = "";

  constructor(
    private router: Router,
    private customRouter: CustomRoutingService,
    private errorSnapshot: CriticalErrorSnapshotService,
    private userHttp: UserHttpService,
    private classroomHttp: ClassroomHttpService
    ){}

  ngOnInit(){
    this.userHttp.getCurrentUserInfo()
    .subscribe(
      (response)=>{
        this.currentUserInfo = response;
        console.log(response)
        this.errorSnapshot.removeErrorStorageIfExist()
        this.isPageLoading = false;
      },
      (error)=> {
        this.errorSnapshot.storeErrorMessage(error.message)
        this.errorSnapshot.storeErrorSourceUrl(this.router.url)
        this.errorSnapshot.storeErrorStatusCode(error.status)
        this.router.navigate(["/error"])
      });
    }

    createClassroomSubmit():void {
      this.isLoadingSpinnerOn = true;
      if(this.classroomNameFieldText.length > this.maximumClassroomNameLength || this.classroomNameFieldText.length < this.minimumClassroomNameLength) {
        this.errorWithCreatingClassroomContent = "Classroom must have 5- 16 characters";
        this.isErrorWithCreatingClassroom = true;
        return;
      }
      this.classroomHttp.createClassroom( this.classroomNameFieldText)
      .subscribe(
        (response)=>{
          this.isLoadingSpinnerOn = false;
          console.log(response)
          this.isClassroomCreatedWithoutErrors = true;
          this.createdClassroomName = response.name;
        },
        (error)=>{
          this.isLoadingSpinnerOn = false;
          this.errorWithCreatingClassroomContent = error.error.error;
          this.isErrorWithCreatingClassroom = true;
        });
    }

    switchToOwnedClassroom() : void {
      this.customRouter.editRouteAfterLastBackslash("my-classrooms/owned");
    }

    removePopupAndSwitchToOwnedClassroom() : void{
      this.isClassroomCreatedWithoutErrors = false
      this.customRouter.editRouteAfterLastBackslash("my-classrooms/owned")
    }
    
}
