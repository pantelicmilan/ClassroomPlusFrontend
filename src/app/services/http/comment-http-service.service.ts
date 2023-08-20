import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSpecificEndpointWithBase } from 'src/app/helpers/CreateSpecificEndpointWithBase';
import { Comment } from 'src/app/models/responseModels/Comment';
import { ApiBaseRouteService } from '../others/api-base-route.service';

@Injectable({
  providedIn: 'root'
})
export class CommentHttpService extends CreateSpecificEndpointWithBase {

  readonly baseEndpoint: string = this.apiBaseRoute.baseUrl+"/api/Comment";

  constructor(private http: HttpClient, private apiBaseRoute: ApiBaseRouteService) {
    super()
  }

  //POST

  createComment(commentContent: string, postId: number) : Observable<Comment>{
    return this.http.post<Comment>(this.baseEndpoint, {content: commentContent, postId: postId})
  }

  //PATCH 

  editComment(commentId: number, commentContent: string) : Observable<Comment>{
    return this.http.patch<Comment>(this.baseEndpoint, {id: commentId, content: commentContent})
  }

  //DELETE
  
  deleteComment(commentId: number) : Observable<Comment> {
    const endpoint = this.createSpecificEndpoint(`/${commentId}`)
    return this.http.delete<Comment>(endpoint)
  }

}
