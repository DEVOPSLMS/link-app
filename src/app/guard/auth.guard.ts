import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanMatch,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.verifyUser().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; // Allow access
        } else {
          // Redirect to login with return URL
          return this.router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url },
          })
          
         
        }
      })
    );
  }
}
