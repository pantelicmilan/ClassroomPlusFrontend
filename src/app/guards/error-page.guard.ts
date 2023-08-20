import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CriticalErrorSnapshotService } from "../services/others/critical-error-snapshot.service";

@Injectable({providedIn: 'root'})
export class ErrorPageGuard implements CanActivate {

    constructor(private router: Router, private errorPageSnapshot: CriticalErrorSnapshotService){}

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(
            this.errorPageSnapshot.getStoredErrorStatusCode() != null && 
            this.errorPageSnapshot.getStoredErrorSourceUrl() != null &&
            this.errorPageSnapshot.getStoredErrorMessage() != null
            ){
            return true;
        }
        return false;
    }

}