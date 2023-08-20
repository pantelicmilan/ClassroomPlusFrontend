import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSpecificEndpointWithBase } from 'src/app/helpers/CreateSpecificEndpointWithBase';
import { ClassroomEnrollment } from 'src/app/models/responseModels/ClassroomEnrollment';
import { ApiBaseRouteService } from '../others/api-base-route.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomEnrollmentHttpService extends CreateSpecificEndpointWithBase  {

  readonly baseEndpoint: string = this.apiBaseRoute.baseUrl + "/api/UsersClassroomsRelationship";

  constructor(private http: HttpClient, private apiBaseRoute: ApiBaseRouteService){
    super()
  }

  //GET

  getClassroomEnrollmentById(id: number) : Observable<ClassroomEnrollment> {
    const endpoint = super.createSpecificEndpoint(`/${id}`)
    return this.http.get<ClassroomEnrollment>(endpoint)
  }

  getCurrentUserClassroomsEnrollments() : Observable<ClassroomEnrollment[]> {
    const endpoint = super.createSpecificEndpoint(`/userId`)
    return this.http.get<ClassroomEnrollment[]>(endpoint)
  }

  getClassroomsEnrollmentsByClassroomId(classroomId: number) : Observable<ClassroomEnrollment[]> {
    const endpoint = super.createSpecificEndpoint(`/classroom/${classroomId}`)
    return this.http.get<ClassroomEnrollment[]>(endpoint)
  }

  //POST

  createClassroomEnrollment(joinCode: string) : Observable<ClassroomEnrollment> {
    const endpoint = super.createSpecificEndpoint(`/joinCode/${joinCode}`)
    return this.http.get<ClassroomEnrollment>(endpoint)
  }

  //DELETE

  deleteClassroomEnrollmentByClassroomEnrollmentId(classroomEnrollmentId: number) : Observable<ClassroomEnrollment>{
    const endpoint = super.createSpecificEndpoint(`/${classroomEnrollmentId}`)
    return this.http.delete<ClassroomEnrollment>(endpoint)
  }

  deleteClassroomEnrollmentWhereClassroomIdAndCurrentUserId(classroomId: number) : Observable<ClassroomEnrollment> {
    const endpoint = super.createSpecificEndpoint(`/whereClassroomIdAndUserId/${classroomId}`)
    return this.http.delete<ClassroomEnrollment>(endpoint)
  }

}
