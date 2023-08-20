import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/others/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router : Router, private authService: AuthService) {}
  
  username: string = "";
  name: string ="";
  surname: string ="";
  email: string ="";
  password: string ="";
  errorContent: string ="";

  isRegisterError: boolean = false;
  isRegisterComplete: boolean = false;
  isLoadingSpinnerOn:boolean = false;

  switchToLogin(){
    this.router.navigate(["/login"])
  }

  onSubmit() : void {
    this.isLoadingSpinnerOn = true;
    this.authService.register(
      this.username, 
      this.password, 
      this.name, 
      this.surname, 
      this.email).subscribe(
      (response)=>{
        this.isLoadingSpinnerOn = false;
        this.isRegisterComplete = true;
      }, 
      
      (error)=>{
        this.isLoadingSpinnerOn = false;
        if(error.error.error){
          this.errorContent = error.error.error
        }else{
          this.errorContent = 'Error in server communication!'
        }
        this.isRegisterError = true;
      });

  }

}
