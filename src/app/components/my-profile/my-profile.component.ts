import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/others/auth.service';
import { ElementRef } from '@angular/core';
import { CriticalErrorSnapshotService } from '../../services/others/critical-error-snapshot.service';
import { Router } from '@angular/router';
import { RealtimeNotificationsService } from '../../services/others/realtime-notifications.service';
import { UserHttpService } from 'src/app/services/http/user-http-service.service';
import { User } from 'src/app/models/responseModels/User';
import { ApiBaseRouteService } from 'src/app/services/others/api-base-route.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  constructor(
    private authService: AuthService,
    private criticalErrorSnapshot: CriticalErrorSnapshotService,
    private router: Router,
    private realtimeNotification: RealtimeNotificationsService,
    private userHttp: UserHttpService,
    private baseApiPath: ApiBaseRouteService
    ) {}
  isErrorInEditingProfile : boolean = false;

  personalInfo : User | null = null;
  editMode : boolean = false;
  isPageLoading : boolean = true;
  editNameFieldText : string = "";
  editSurnameFieldText : string = "";
  editUsernameFieldText : string = "";
  classroomOwned : number = 0;

  isLoadingSpinnerOn: boolean = false;

  basePath : string = this.baseApiPath.baseUrl;
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  editProfileImage(changePictureInputFieldData: Event){
    const inputData = changePictureInputFieldData.target as HTMLInputElement;
    const imageFiles = inputData.files;
    this.isLoadingSpinnerOn = true;

    if (imageFiles && imageFiles.length > 0) {
      const selectedFile = imageFiles[0];
      this.userHttp.editProfilePicture(selectedFile).subscribe(
        response => {
          this.isLoadingSpinnerOn = false;
          this.personalInfo!.profileImageUrl = response.profileImageUrl;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }
  }

  ngOnInit(){
    this.userHttp.getCurrentUserInfo().subscribe(
      (response) => {
        this.editNameFieldText = response.name;
        this.editSurnameFieldText = response.surname;
        this.editUsernameFieldText = response.username;
        this.classroomOwned = response.classrooms.length;
        this.personalInfo = response;
        this.criticalErrorSnapshot.removeErrorStorageIfExist()
        this.isPageLoading = false;
      },
      (error)=> {
        console.log(error)
        this.criticalErrorSnapshot.storeErrorStatusCode(error.status)
        this.criticalErrorSnapshot.storeErrorMessage(error.message)
        this.criticalErrorSnapshot.storeErrorSourceUrl(this.router.url)
        this.criticalErrorSnapshot.navigateToErrorPage();
      }
    )
  }

  editProfile(): void{
    this.isLoadingSpinnerOn = true;
    this.userHttp.editUserTextualInfo(this.editNameFieldText, this.editSurnameFieldText, this.editUsernameFieldText).subscribe(
      (response) => {
        this.editMode = false;
        this.isLoadingSpinnerOn = false;
        this.editNameFieldText = response.name;
        this.editSurnameFieldText = response.surname;
        this.editUsernameFieldText = response.username;
      },
      (error)=> {
        this.isLoadingSpinnerOn = false;
        this.isErrorInEditingProfile = true;
      }
    )
  }

  logout(): void{
    this.realtimeNotification.stopConnection();
    this.authService.logout();
  }

  switchEditMode(){
    this.editMode = !this.editMode;
  }

  removeImage(){
    this.isLoadingSpinnerOn = true;
    this.userHttp.deleteCurrentProfilePictureIfExist().subscribe(
      response=>{
        this.isLoadingSpinnerOn = false;
        this.personalInfo!.profileImageUrl="default.png"},
      error=>{
        this.isLoadingSpinnerOn = false;
        this.isErrorInEditingProfile = true;
        }
    )
  }

}
