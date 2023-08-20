import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSpecificEndpointWithBase } from 'src/app/helpers/CreateSpecificEndpointWithBase';
import { Classroom } from 'src/app/models/responseModels/Classroom';
import { ApiBaseRouteService } from '../others/api-base-route.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomHttpService extends CreateSpecificEndpointWithBase {

  constructor(private http: HttpClient, private apiBaseRoute: ApiBaseRouteService){
    super()
  }

  readonly baseEndpoint: string = this.apiBaseRoute.baseUrl + '/api/Classroom';

  //GET

  getOwnedClassroomByClassroomId(classroomId: number, postsPerPage: number) : Observable<Classroom>{
    const endpoint = this.createSpecificEndpoint(`/${classroomId}/${postsPerPage}`)
    return this.http.get<Classroom>(endpoint)
  }

  getAllOwnedClassrooms() : Observable<Classroom[]>{
    const endpoint = this.createSpecificEndpoint(`/userId`)
    return this.http.get<Classroom[]>(endpoint)
  }

  getClassroomByJoinCode(joinCode: string) {
    const endpoint = this.createSpecificEndpoint(`/joinCode/${joinCode}`)
    return this.http.get<Classroom>(endpoint)
  }

  //POST

  createClassroom(classroomName: string) : Observable<Classroom> {
    return this.http.post<Classroom>(this.baseEndpoint, {Name: classroomName})
  }

  //PATCH
  
  editClassroom(classroomId: number, classroomName: string) : Observable<Classroom> {
    return this.http.patch<Classroom>(this.baseEndpoint, {Id: classroomId , Name: classroomName })
  }

  //DELETE

  deleteClassroomByClassroomId(classroomId: number) : Observable<Classroom>{
    const endpoint = this.createSpecificEndpoint(`/${classroomId}`)
    return this.http.delete<Classroom>(endpoint)
  }



}
