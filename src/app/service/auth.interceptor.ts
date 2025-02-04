import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService){}
    private authSubscription: Subscription | null = null;
    token: any;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req);
  }
}