import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPasswordComponent } from './component/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/auth/verify-email/verify-email.component';
import { CollectionComponent } from './component/collections/collection/collection.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { CollectionService } from './service/collection.service';
import { DragDropModule,CdkDragHandle,CdkDrag } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import{CdkTreeModule}from'@angular/cdk/tree';
import { ApplicationComponent } from './component/application/application.component';
import { AddCollectionModalComponent } from './component/collections/add-collection-modal/add-collection-modal.component';
import { DeleteCollectionModalComponent } from './component/collections/delete-collection-modal/delete-collection-modal.component';
import { EditCollectionModalComponent } from './component/collections/edit-collection-modal/edit-collection-modal.component';
import { DatePipe } from '@angular/common';
import { AddLinkModalComponent } from './component/link-collection/add-link-modal/add-link-modal.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DeleteLinkModalComponent } from './component/link-collection/delete-link-modal/delete-link-modal.component';
import { UpdateLinkModalComponent } from './component/link-collection/update-link-modal/update-link-modal.component';
import { LoginComponent } from './component/auth/login/login.component';
import { ShareCollectionComponent } from './component/collections/share-collection/share-collection.component';
import { ShareCollectionModalComponent } from './component/collections/share-collection-modal/share-collection-modal.component';
import { PopUpDialogComponent } from './component/pop-up-dialog/pop-up-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    AddLinkModalComponent,
    DeleteLinkModalComponent,
    UpdateLinkModalComponent,
    LoginComponent,
    ShareCollectionComponent,
    ShareCollectionModalComponent,
    PopUpDialogComponent,

    
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
    ScrollingModule,
    ClipboardModule,
    CdkDrag
  ],

  providers: [AuthService,CookieService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},CollectionService,DatePipe],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
