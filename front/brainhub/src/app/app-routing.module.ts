import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './LoginF/login/login.component';
import { RegisterComponent } from './RegisterF/register/register.component';
import { ProfileComponent } from './ProfileF/profile/profile.component';
import { HomeComponent } from './HomeF/home/home.component';
import { CoursListComponent } from './CoursList/cours-list/cours-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'cours',component: CoursListComponent },
  { path: 'course-details/:id', component: CourseDetailsComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
