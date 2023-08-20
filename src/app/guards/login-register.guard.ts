import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginRegisterGuard implements CanActivate {

    constructor(private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const authorizationTokenKey = "Authorization"
        if(localStorage.getItem(authorizationTokenKey)){
            this.router.navigate(["main/dashboard"])
            return false;
        }else{
            return true;
        }
    }

}