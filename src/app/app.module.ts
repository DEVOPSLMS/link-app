import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { CollectionComponent } from './component/collections/collection/collection.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { CollectionService } from './service/collection.service';
import { DragDropModule,CdkDragHandle } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import{CdkTreeModule}from'@angular/cdk/tree';
import { ApplicationComponent } from './component/application/application.component';
import { AddCollectionModalComponent } from './component/collections/add-collection-modal/add-collection-modal.component';
import { DeleteCollectionModalComponent } from './component/collections/delete-collection-modal/delete-collection-modal.component';
import { EditCollectionModalComponent } from './component/collections/edit-collection-modal/edit-collection-modal.component';
import { ViewCollectionModalComponent } from './component/collections/view-collection-modal/view-collection-modal.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginModalComponent,
    SignupComponent,
    HomeLayoutComponent,
    SigninLayoutComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CollectionComponent,
    ApplicationComponent,
    AddCollectionModalComponent,
    DeleteCollectionModalComponent,
    EditCollectionModalComponent,
    ViewCollectionModalComponent,

    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    CdkDragHandle,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkTreeModule,

  ],

  providers: [AuthService,CookieService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},CollectionService,DatePipe],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
