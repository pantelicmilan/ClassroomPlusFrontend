import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authorizationTokenKey = "Authorization"
    const currentAngularUrl = this.router.url;

    if(!currentAngularUrl.includes('/login') && !currentAngularUrl.includes('/register')){
      const authToken = localStorage.getItem(authorizationTokenKey)
      if(authToken){
        const interceptedRequest = request.clone({
          setHeaders: {
            Authorization: authToken
          }
        })
        return next.handle(interceptedRequest);
      }

    }
    return next.handle(request);
  }
}
