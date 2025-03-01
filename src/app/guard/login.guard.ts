import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.verifyUser().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          console.log('User is authenticated, redirecting to /app');
          // Redirect logged-in users away from login page
          return this.router.createUrlTree(['/app']);
        } else {
          // Allow access to login page
          return true; 
        }
      }),
      catchError((error) => {
        console.error('Error verifying user:', error);
        // Handle error and allow access to login page
        return of(true);
      })
    );
  }
}
