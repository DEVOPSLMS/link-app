import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService,private router:Router){}
    private authSubscription: Subscription | null = null;
    token: any;
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !request.url.includes('/refresh-token')) {
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                // Retry original request with new token
                return next.handle(request);
              }),
              catchError((refreshError) => {
                this.authService.logout();
                
                return throwError(refreshError);
              })
            );
          }
          return throwError(error);
        })
      );
    }
}