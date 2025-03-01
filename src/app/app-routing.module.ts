import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { ForgotPasswordComponent } from './component/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/auth/verify-email/verify-email.component';
import { CollectionComponent } from './component/collections/collection/collection.component';
import { ApplicationComponent } from './component/application/application.component';
import { LoginComponent } from './component/auth/login/login.component';
import { ShareCollectionComponent } from './component/collections/share-collection/share-collection.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',

    component: HomeLayoutComponent,

    children: [
      {
        path: 'app',
        canActivate: [AuthGuard],
        component: ApplicationComponent,
      },

      {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
      },
      {
        path: 'share',
        component: ShareCollectionComponent,
      },
    ],
  },

  {
    path: '',
    component: SigninLayoutComponent,

    children: [
      {
        path: 'auth/register',
        component: SignupComponent,
      },

      {
        path: 'auth/forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'auth/verify-email',
        component: VerifyEmailComponent,
      },

      {
        path: 'auth/login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
