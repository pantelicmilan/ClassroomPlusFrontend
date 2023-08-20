import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyClassroomsComponent } from '../components/my-classrooms/my-classrooms.component';
import { MyProfileComponent } from '../components/my-profile/my-profile.component';
import { CreateClassroomComponent } from '../components/create-classroom/create-classroom.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { MyClassroomsJoinedComponent } from '../components/my-classrooms-joined/my-classrooms-joined.component';
import { MyClassroomsOwnedComponent } from '../components/my-classrooms-owned/my-classrooms-owned.component';
import { LoginRegisterGuard } from '../guards/login-register.guard';
import { ClassroomComponent } from '../components/classroom/classroom.component';
import { MainComponent } from '../components/main/main.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { ErrorPageGuard } from '../guards/error-page.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard]},
  { path: 'main', canActivate: [AuthGuard], component: MainComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'my-classrooms', pathMatch: 'full' },
      { path: 'my-classrooms', component: MyClassroomsComponent, children: [
        { path: '', redirectTo: 'joined', pathMatch: 'full' },
        { path: 'owned', component: MyClassroomsOwnedComponent },
        { path: 'joined', component: MyClassroomsJoinedComponent }
      ]},
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'create-classroom', component: CreateClassroomComponent },
      {path: 'error', component:ErrorPageComponent, canActivate: [ErrorPageGuard] },
    ]},
    { path: 'classroom/:id', component: ClassroomComponent }
  ]}
  ,
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
