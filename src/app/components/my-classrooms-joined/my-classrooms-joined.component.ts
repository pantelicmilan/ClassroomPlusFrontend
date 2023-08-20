import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomRoutingService } from '../../services/others/custom-routing.service';
import { CriticalErrorSnapshotService } from '../../services/others/critical-error-snapshot.service';
import { ClassroomEnrollmentHttpService } from 'src/app/services/http/classroom-enrollment-http-service.service';
import { ClassroomEnrollment } from 'src/app/models/responseModels/ClassroomEnrollment';

@Component({
  selector: 'app-my-classrooms-joined',
  templateUrl: './my-classrooms-joined.component.html',
  styleUrls: ['./my-classrooms-joined.component.css']
})
export class MyClassroomsJoinedComponent {

  currentUserClassroomEnrollments : ClassroomEnrollment[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private customRouter: CustomRoutingService,
    private errorSnapshot: CriticalErrorSnapshotService,
    private classroomEnrollment: ClassroomEnrollmentHttpService
    ){}

  ngOnInit(){
    this.classroomEnrollment.getCurrentUserClassroomsEnrollments().subscribe(
      (response)=>{
        this.currentUserClassroomEnrollments = response;
        console.log(response)
        this.errorSnapshot.removeErrorStorageIfExist()
        this.isLoading = false;
      },      
      (error)=>{
        this.errorSnapshot.storeErrorMessage(error.message)
        this.errorSnapshot.storeErrorSourceUrl(this.router.url)
        this.errorSnapshot.storeErrorStatusCode(error.status)
        this.errorSnapshot.navigateToErrorPage();
      }
      )
  }

  switchToOwned() : void {
    this.customRouter.editRouteAfterLastBackslash('owned');
  }


}
