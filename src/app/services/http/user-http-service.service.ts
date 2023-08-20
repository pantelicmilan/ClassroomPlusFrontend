import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSpecificEndpointWithBase } from 'src/app/helpers/CreateSpecificEndpointWithBase';
import { ImageFileForHttpFormEncapsulation } from 'src/app/helpers/ImageFileForHttpFormEncapsulation';
import { User } from 'src/app/models/responseModels/User';
import { ApiBaseRouteService } from '../others/api-base-route.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends CreateSpecificEndpointWithBase{

  readonly baseEndpoint: string = this.apiBaseRoute.baseUrl + "/api/User";

  constructor(private http: HttpClient, private apiBaseRoute: ApiBaseRouteService) { 
    super()
  }

  editProfilePicture(imageFile: File) : Observable<User> {
    const formData = new ImageFileForHttpFormEncapsulation(imageFile)
    return this.http.patch<User>(
      this.createSpecificEndpoint('/editUserProfilePicture'), 
      formData.getImageFileHttpForm() )
  }

  deleteCurrentProfilePictureIfExist(): Observable<User> {
    return this.http.delete<User>(this.createSpecificEndpoint('/deleteProfilePicture'))
  }

  getCurrentUserInfo() : Observable<User> {
    return this.http.get<User>(this.createSpecificEndpoint('/id'))
  }

  editUserTextualInfo(name: string, surname: string, username: string) : Observable<User>{
    return this.http.put<User>(this.baseEndpoint, {
      "Name": name,
      "Surname": surname,
      "Username": username
    })
  }

}
