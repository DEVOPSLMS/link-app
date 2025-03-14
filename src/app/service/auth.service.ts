import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  take,
  tap,
  throwError,
} from 'rxjs';
import { EncryptionService } from './encryption.service';
import { LoginModel, LoginResponse } from '../Models/login_model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7174/api';
  private refreshTokenSubject = new BehaviorSubject<string>('');
  refreshToken$ = this.refreshTokenSubject.asObservable();
  private email = new BehaviorSubject<string>(''); // Default value
  currentEmail = this.email.asObservable();
  private isLoggedinSubject = new BehaviorSubject<boolean>(true);
  public isLoggedin$ = this.isLoggedinSubject.asObservable();
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private encryptService: EncryptionService
  ) {}

  refreshToken() {
    return this.http
      .post(this.apiUrl + '/refresh-token', {}, { withCredentials: true })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred.';
          if (
            error.status === 500 &&
            error.error.message == 'Refresh token not found.'
          ) {
            errorMessage = 'Invalid credentials';
          } else if (
            error.status === 500 &&
            error.error.message === 'Invalid refresh token'
          ) {
            // Use a code from the API response for precise handling
            errorMessage = 'Error : Invalid credentials';
          }
          return throwError(() => ({
            code: error.error?.code || '500',
            message: errorMessage,
          }));
        }),
        tap({
          next: () => this.isLoggedinSubject.next(true),
          error: () => this.isLoggedinSubject.next(false),
        })
      );
  }

  getEmail() {
    return this.http
      .post(this.apiUrl + '/email', {}, { withCredentials: true })
      .pipe(catchError((error) => EMPTY));
  }
  register(
    email: string,
    FirstName: string,
    LastName: string,
    password: string
  ): Observable<any> {
    return this.http
      .post(this.apiUrl + '/register', { email, FirstName, LastName, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => ({
            code: error.error?.code || '500',
          }));
        }),
        tap((response: any) => {
          setTimeout(() => {
            this.router.navigateByUrl('/verify-email');
          }, 2000);
        })
      );
  }
  getProfile():Observable<LoginResponse>{
    return this.http
    .post(
      this.apiUrl + '/current-user',
      { },
      { withCredentials: true }
    )
    .pipe(
      catchError((error) => EMPTY),

      tap((response: any) => {
      })
    );
  }
  login(credentials: LoginModel): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiUrl + '/login', credentials, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          console.log(error.status)
          let errorMessage = 'An unknown error occurred.';
          if (error.status === 0) {
            errorMessage = 'Email not verified';
            setTimeout(() => {
              this.router.navigateByUrl('auth/verify-email');
            }, 2000);
          } else if (
            error.status === 500 &&
            error.error.message === 'Invalid email or password'
          ) {
            // Use a code from the API response for precise handling
            errorMessage = 'Invalid email or password.';
          }

          return throwError(() => ({
            code: error.error?.code || '500',
            message: errorMessage,
          }));
        }),
        tap((response: any) => {
          setTimeout(() => {
            this.isLoggedinSubject.next(true);
          }, 2000);
        })
      );
  }

  verifyEmail(email: string, code: string): Observable<any> {
    return this.http
      .post(
        this.apiUrl + '/Email-Verification',
        { email, code: code.toString() },
        { withCredentials: true }
      )
      .pipe(
        catchError((error) => EMPTY),

        tap((response: any) => {
          this.refreshTokenSubject.next('true');
          setTimeout(() => {
            this.router.navigateByUrl('/app');
          }, 2000);
        })
      );
  }

  logout() {
    this.isLoggedinSubject.next(false);
    this.userLogout().subscribe({});
  }
  userLogout() {
    return this.http
      .post(this.apiUrl + '/logout', {}, { withCredentials: true })
      .pipe(
        catchError((error:HttpErrorResponse) =>{
          this.router.navigateByUrl('auth/login');
          return EMPTY;
        } ),
        tap((response: any) => {
          this.router.navigateByUrl('auth/login');
        })
      );
  }
  resendEmail(email: string) {
    return this.http.post(this.apiUrl + '/Send-Email', { email }).pipe(
      catchError((error) => EMPTY),
      tap((response: any) => {})
    );
  }
  verifyUser(): Observable<boolean> {
    return this.http
      .post(
        this.apiUrl + '/check-user',
        {},
        { withCredentials: true, responseType: 'text' }
      )
      .pipe(
        catchError((error) => EMPTY),
        tap((response: any) => {})
      );
  }

}
