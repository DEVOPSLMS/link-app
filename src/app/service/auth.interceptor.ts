import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, Subscription, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }
  private authSubscription: Subscription | null = null;
  token: any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/api/refresh-token')) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              console.log("user is authenticated")
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
  private isTokenExpiringSoon(secondsBefore = 30): Observable<boolean> {
    return this.authService.getAccessToken().pipe(
      map(token => {
        if (!token) return false;
  
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiresAt = payload.exp * 1000;
          return expiresAt - Date.now() < secondsBefore * 1000;
        } catch (e) {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }
}