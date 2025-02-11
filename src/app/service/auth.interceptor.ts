import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, ReplaySubject, Subscription, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService,) { }
  private authSubscription: Subscription | null = null;
  token: any;
  dataStream: ReplaySubject<any> = new ReplaySubject();
private requestQueue:HttpRequest<any>[]=[];
  dataStream$(): Observable<any> {
      return this.dataStream;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

  
        if (error.status === 401 && !request.url.includes('/api/refresh-token')) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              console.log("user is authenticated");
            
              return next.handle(request);
            
            }),
            catchError((refreshError) => {
              this.authService.logout();
              
              return throwError(()=>refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

}