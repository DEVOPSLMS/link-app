import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { CollectionComponent } from './component/collection/collection.component';
import { FooterComponent } from './component/footer/footer.component';
import { ApplicationComponent } from './component/application/application.component';




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
      {
        path: 'collection',
        component: CollectionComponent 
      },
      {
        path: 'footer',
        component: FooterComponent 
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
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent 
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent 
      },
      {
        path: 'app',
        component: ApplicationComponent 
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
