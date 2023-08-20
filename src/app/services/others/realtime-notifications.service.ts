import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ApiBaseRouteService } from './api-base-route.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeNotificationsService {

  private readonly signalRUrl : string = this.baseApiUrl.baseUrl + "/notification"
  private connection: signalR.HubConnection;
  
  constructor(private http: HttpClient, private baseApiUrl: ApiBaseRouteService) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.signalRUrl)
      .build();
  }

  startConnection() {
    this.connection.start()
      .then(() => {
        console.log('SignalR Connected!');
        this.joinToGroups();
      })
      .catch((err) => {
        console.log("kompletan sled greske:")
        console.log(err)
        console.log("GRESKA PRI KONEKTOVANJU POKUSAVAM OPET POSLE 5 sek");
      });
  }

  addPostCreatedListener(callback: (message: { comments: any[], createdDate: string, description: string, id: number, name: string , creatorUsername: string, classroomId: number}) => void) {
    this.connection.on('PostCreated', (message) => {
      callback(message);
    });
  }
  
  addPostDeletedListener(callback: (postId: number, classroomId: number, groupName: string) => void) {
    this.connection.on('PostDeleted', (postId: number, classroomId: number, groupName: string) => {
      callback(postId, classroomId, groupName)
    })
  }

  sendNotification(notification: string){
    this.connection.invoke("PublishNotification", notification);
  }

  sendNotificationToGroup(notification: { comments: any[], createdDate: string, description: string, id: number, name: string , creatorUsername: string, classroomId: number}, groupName: string){
    this.connection.invoke("PublishNotificationToGroup", notification, groupName)
  }

  sendPostDeletedDataToGroup(postId: number, classroomId: number, groupName: string){
    this.connection.invoke("PublishPostDeletedNotificationToGroup", postId, classroomId, groupName)
  }

  leaveGroup(groupName: string){
    this.connection.invoke("LeaveGroup", groupName)
  }

  joinGroup(groupName: string){
    this.connection.invoke("JoinGroup", groupName)
  }

  stopConnection(){
    this.connection.stop();
    console.log("konekcija sa signalr om prekinuta!")
  }

  async joinToGroups(){
  
    const enrollmentResponse = await this.http.get<{classroomId: number}[]>(this.baseApiUrl.baseUrl + "/api/UsersClassroomsRelationship/userId").toPromise();
    console.log("enrollmentResponse:")
    console.log(enrollmentResponse)

  
    const userEnrollment: {classroomId: number}[] = enrollmentResponse || [];

    console.log("ovo je enrollment")
    console.log(userEnrollment)
    if(userEnrollment.length > 0){
      userEnrollment.forEach(enrollment => {
        
        this.connection.invoke("JoinGroup", enrollment.classroomId.toString())
     
        console.log("usao si u grupu: " + enrollment.classroomId)
      });
    }
    else{
      console.log("imamo problemcic")
    }
    

  }






}
