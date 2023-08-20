import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { ClassroomHttpService } from 'src/app/services/http/classroom-http-service.service';
import { Classroom } from 'src/app/models/responseModels/Classroom';

enum NavbarMenuOptions {
  MyClassrooms = "1",
  MyProfile = "2",
  CreateClassroom = "3"
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router : Router, 
    private classroomHttp: ClassroomHttpService
    ){
      this.routeCheckingAndNavbarMenuAnimating();
    }

  @Output() classroomWithSpecificJoinCodeFound : EventEmitter<Classroom> = new EventEmitter<Classroom>();
  @Output() classroomFoundError : EventEmitter<string> = new EventEmitter<string>();
  @Output() joinCodeEntered: EventEmitter<void> = new EventEmitter<void>();

  joinCodeInputField : string = "";
  isHamburgerMenuActive : boolean = false;
  navbarMenuOption : NavbarMenuOptions = NavbarMenuOptions.MyClassrooms;

  setNavbarMenuOption(navOption : NavbarMenuOptions) : void {
    this.navbarMenuOption = navOption;
  }

  hamburgerMenuForMobileClick(){
    this.isHamburgerMenuActive = !this.isHamburgerMenuActive
  }

  redirectToRoute(route : string){
    this.router.navigate([route]);
  }

  ngOnInit() : void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.routeCheckingAndNavbarMenuAnimating();
      } 
    });
  }

  submitClassroomJoin() : void {
    this.joinCodeEntered.emit();
    if(this.joinCodeInputField == ""){
      this.classroomFoundError.emit("You must enter join code before joining")
      return;
    }

    this.classroomHttp.getClassroomByJoinCode(this.joinCodeInputField).subscribe(
      (response)=>{
        let classroomWithJoinCode : Classroom = {...response, joinCode: this.joinCodeInputField}
        this.classroomWithSpecificJoinCodeFound.emit(classroomWithJoinCode);
      },
      (error)=>{
        console.log(error.error.error)
        this.classroomFoundError.emit(error.error.error)
      })
  }

  private routeCheckingAndNavbarMenuAnimating() : void {
    if(
      this.router.url === '/main/dashboard/my-classrooms' || 
      this.router.url === '/main/dashboard/my-classrooms/joined' || 
      this.router.url === '/main/dashboard/my-classrooms/owned'){
      this.setNavbarMenuOption(NavbarMenuOptions.MyClassrooms)
    }
    if(this.router.url === '/main/dashboard/my-profile'){
      this.setNavbarMenuOption(NavbarMenuOptions.MyProfile)
    }
    if (this.router.url === '/main/dashboard/create-classroom') {
      this.setNavbarMenuOption(NavbarMenuOptions.CreateClassroom)
    }
  }

}
