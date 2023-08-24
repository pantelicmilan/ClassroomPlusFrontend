import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserHttpService } from '../http/user-http-service.service';
import { ApiBaseRouteService } from './api-base-route.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router, private userHttp: UserHttpService, private apiBaseRoute: ApiBaseRouteService) { }

    register(
      username: string,
      password: string,
      name: string,
      surname: string,
      email: string
    ): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
      const formData = new URLSearchParams();
      formData.set('Username', username);
      formData.set('Password', password);
      formData.set('Name', name);
      formData.set('Surname', surname);
      formData.set('Email', email);
    
      return this.http.post(this.apiBaseRoute.baseUrl + '/api/register', formData.toString(), { headers });
    }

  login(username: string, password: string) : Observable<any> {

    const loginData = {
      Username : username, 
      Password: password
    }

    return this.http.post(this.apiBaseRoute.baseUrl+'/api/User/login', loginData);
  }

  logout(){
    localStorage.removeItem("Authorization");
    this.router.navigate(["/login"])
  }

}
