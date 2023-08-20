import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CriticalErrorInformationLocalStorageKeys } from 'src/app/models/applicationLogicModels/criticalErrorSnapshotService/CriticalErrorInformationsKeys';

@Injectable({
  providedIn: 'root'
})
export class CriticalErrorSnapshotService {

  constructor(private router: Router ){}
  
  private readonly localStorageKeys: CriticalErrorInformationLocalStorageKeys = {
    errorStatusCodeKey: "errorStatusCodeKey",
    errorMessageKey: "errorMessageKey",
    errorSourceUrlKey: "errorSourceUrlKey"
  }

  storeErrorStatusCode(statusCode: number) : void{
    localStorage.setItem(this.localStorageKeys.errorStatusCodeKey, statusCode.toString())
  }

  storeErrorMessage(errorMessage: string) : void {
    localStorage.setItem(this.localStorageKeys.errorMessageKey, errorMessage)
  }

  storeErrorSourceUrl(errorSourceUrl: string) : void {
    localStorage.setItem(this.localStorageKeys.errorSourceUrlKey, errorSourceUrl)
  }

  getStoredErrorStatusCode():number | null{
    const storedErrorStatusCode = localStorage.getItem(this.localStorageKeys.errorStatusCodeKey)
    return storedErrorStatusCode ? parseInt(storedErrorStatusCode) : null
  }

  getStoredErrorMessage() : string | null {
    const storedErrorMessage =  localStorage.getItem(this.localStorageKeys.errorMessageKey);
    return storedErrorMessage ? storedErrorMessage : null
  }

  getStoredErrorSourceUrl() : string | null {
    const storedErrorSourceUrl =  localStorage.getItem(this.localStorageKeys.errorSourceUrlKey);
    return storedErrorSourceUrl ? storedErrorSourceUrl : null
  }

  removeErrorStorageIfExist() : void{
    const keys = Object.values(this.localStorageKeys) as string[];
    keys.forEach(key => {
      if(localStorage.getItem(key)){
        localStorage.removeItem(key)
      }
    });
  }

  navigateToErrorPage() : void {
    this.router.navigate(["/main/dashboard/error"])
  }

}
