import { Component } from '@angular/core';
import { RealtimeNotificationsService } from '../../services/others/realtime-notifications.service';
import { NewPostNotificationData } from 'src/app/models/applicationLogicModels/mainComponent/NewPostNotificationData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private realtime: RealtimeNotificationsService){}

  currentNotificationData : NewPostNotificationData | null = null;

  private displayNotification(message : NewPostNotificationData ){
    const audio = new Audio("assets/new-post-notification.mp3")
    audio.play()
    this.currentNotificationData = message;
    setTimeout(() => {
      this.currentNotificationData = null;
    }, 3000); 
  }

  ngOnInit(){
    this.realtime.startConnection()
    this.realtime.addPostCreatedListener((message: NewPostNotificationData)=>{
      this.displayNotification({
          comments: message.comments, 
          createdDate: message.createdDate, 
          description: message.description, 
          id: message.id, 
          name: message.name, 
          creatorUsername: 
          message.creatorUsername
        })
    })
  }

}
