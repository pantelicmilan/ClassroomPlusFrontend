import { NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MyClassroomsComponent } from '../components/my-classrooms/my-classrooms.component';
import { MyProfileComponent } from '../components/my-profile/my-profile.component';
import { CreateClassroomComponent } from '../components/create-classroom/create-classroom.component';
import { AuthComponent } from '../components/auth/auth.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { GlobalInterceptor } from '../interceptors/global.interceptor';
import { MyClassroomsOwnedComponent } from '../components/my-classrooms-owned/my-classrooms-owned.component';
import { MyClassroomsJoinedComponent } from '../components/my-classrooms-joined/my-classrooms-joined.component';
import { ClassroomCardComponent } from '../components/classroom-card/classroom-card.component';
import { ErrorPopupMessageComponent } from '../components/popup-messages/error-popup-message/error-popup-message.component';
import { SuccessfulPopupMessageWithAcceptAndDeclineComponent } from '../components/popup-messages/successful-popup-message-with-accept-and-decline/successful-popup-message-with-accept-and-decline.component';
import { SuccessfulPopupMessageWithOkComponent } from '../components/popup-messages/successful-popup-message-with-ok/successful-popup-message-with-ok.component';
import { ClassroomComponent } from '../components/classroom/classroom.component';
import { MainComponent } from '../components/main/main.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { ClassroomMemberComponent } from '../components/classroom-member/classroom-member.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MyClassroomsComponent,
    MyProfileComponent,
    CreateClassroomComponent,
    DashboardComponent,
    AuthComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ErrorMessageComponent,
    MyClassroomsOwnedComponent,
    MyClassroomsJoinedComponent,
    ClassroomCardComponent,
    ErrorPopupMessageComponent,
    SuccessfulPopupMessageWithAcceptAndDeclineComponent,
    SuccessfulPopupMessageWithOkComponent,
    ClassroomComponent,
    MainComponent,
    ErrorPageComponent,
    LoadingComponent,
    ClassroomMemberComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
