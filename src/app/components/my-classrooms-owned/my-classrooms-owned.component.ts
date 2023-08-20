import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomRoutingService } from '../../services/others/custom-routing.service';
import { CriticalErrorSnapshotService } from '../../services/others/critical-error-snapshot.service';
import { ClassroomHttpService } from 'src/app/services/http/classroom-http-service.service';
import { Classroom } from 'src/app/models/responseModels/Classroom';

@Component({
  selector: 'app-my-classrooms-owned',
  templateUrl: './my-classrooms-owned.component.html',
  styleUrls: ['./my-classrooms-owned.component.css']
})
export class MyClassroomsOwnedComponent implements OnInit{

  constructor(
    private router: Router,
    private customRouter: CustomRoutingService,
    private errorSnapshot: CriticalErrorSnapshotService,
    private classroomHttp: ClassroomHttpService
    ){}

  numberOfOwnedClassrooms : number = 0;
  listOfOwnedClassroms : Classroom[] = [];
  isLoading : boolean = true;

  ngOnInit() : void{
    this.classroomHttp.getAllOwnedClassrooms()
    .subscribe((response)=>{
      this.numberOfOwnedClassrooms = response.length
      this.listOfOwnedClassroms = response
      this.errorSnapshot.removeErrorStorageIfExist()
      this.isLoading = false;
    }, (error)=>{
      this.errorSnapshot.storeErrorMessage(error.message)
      this.errorSnapshot.storeErrorSourceUrl(this.router.url)
      this.errorSnapshot.storeErrorStatusCode(error.status)
      this.errorSnapshot.navigateToErrorPage();
    });
  }

  switchToJoined() : void {
    this.customRouter.editRouteAfterLastBackslash('joined');
  }

}
