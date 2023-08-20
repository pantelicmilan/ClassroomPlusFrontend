import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSpecificEndpointWithBase } from 'src/app/helpers/CreateSpecificEndpointWithBase';
import { Post } from 'src/app/models/responseModels/Post';
import { ApiBaseRouteService } from '../others/api-base-route.service';

@Injectable({
  providedIn: 'root'
})
export class PostHttpService extends CreateSpecificEndpointWithBase {

  readonly baseEndpoint: string = this.apiBaseRoute.baseUrl+"/api/Post"

  constructor(private http: HttpClient, private apiBaseRoute: ApiBaseRouteService) {
    super()
   }

   //GET

   getPostByPostId(postId: number) : Observable<Post>{
    const endpoint = this.createSpecificEndpoint(`/${postId}`)
    return this.http.get<Post>(endpoint)
   }

   getPostsByClassroomId(classroomId: number) : Observable<Post>{
    const endpoint = this.createSpecificEndpoint(`/classroom/${classroomId}`)
    return this.http.get<Post>(endpoint)
   }

   getAllPostsMadeByCurrentUser(): Observable<Post>{
    return this.http.get<Post>(this.baseEndpoint)
   }

   getPaginatedPostListByClassroomId(
    classroomId: number, 
    pageSize: number, 
    currentPage: number) : Observable<Post[]>{
    const endpoint = this
    .createSpecificEndpoint(`/classroom/${classroomId}/pageSize=${pageSize}/currentPage=${currentPage}`)
    return this.http.get<Post[]>(endpoint);
   }

   //POST

   createPost(postName: string, postDescription: string, classroomId: number): Observable<Post>{
    return this.http.post<Post>(this.baseEndpoint, {Name: postName, Description: postDescription, ClassroomId: classroomId})
   }

   //PATCH

   editPost(postId: number, postName: string, description: string, classroomId: number): Observable<Post>{
    return this.http.patch<Post>(this.baseEndpoint, {Id: postId, Name: postName, Description: description, ClassroomId: classroomId })
   }

   //DELETE

   deletePostByPostId(postId: number) : Observable<Post>{
    const endpoint = this.createSpecificEndpoint(`/${postId}`)
    return this.http.delete<Post>(endpoint)
   }

}
