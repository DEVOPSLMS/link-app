import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';

const routes: Routes = [
  {
    path: '',                       
    component: HomeLayoutComponent,

    children: [
      {
        path: 'home',
        component: HomeComponent 
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    component: SigninLayoutComponent, 
    children: [
      {
        path: 'register',
        component: SignupComponent 
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
