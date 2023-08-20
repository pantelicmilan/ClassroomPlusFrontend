import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomRoutingService {

  constructor(private router : Router) { }

  editRouteAfterLastBackslash(lastRoute : string) : void {
    const currentRoute = this.router.url;
    const lastSlashIndex = currentRoute.lastIndexOf('/');
    const newRoute = currentRoute.substr(0, lastSlashIndex + 1) + lastRoute;

    this.router.navigateByUrl(newRoute);
  }

}
