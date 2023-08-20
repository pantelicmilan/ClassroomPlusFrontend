import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/others/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginError : boolean = false;
  errorContent : string = "";

  username : string = "";
  password : string =  "";

  isLoadingSpinnerOn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  onSubmit(){
    this.isLoadingSpinnerOn = true;
    const authorizationTokenKey = "Authorization"
    this.authService.login(this.username, this.password)
    .subscribe(
      (response)=>{
        this.isLoginError = false;
        this.isLoadingSpinnerOn = false;
        if(response.jwtToken){
          if(localStorage.getItem(authorizationTokenKey)){
            localStorage.removeItem(authorizationTokenKey)
          }

          localStorage.setItem(authorizationTokenKey, "bearer "+response.jwtToken)
          this.router.navigate(["main"])
        }

      },
      (error)=> {
        console.log(error)
        this.isLoginError = true;
        this.isLoadingSpinnerOn = false;

        if(error.error.error){
          this.errorContent = error.error.error
        }else{
          this.errorContent = 'Onemogucena komunikacija sa serverom!'
        }
        
      }
      )

  }

  switchToRegister(){
    this.router.navigate(['/register']);
  }
}
