import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7174/api";
  private refreshTokenSubject = new BehaviorSubject<string>('');
  refreshToken$ = this.refreshTokenSubject.asObservable();
  private email = new BehaviorSubject<string>(''); // Default value
  currentEmail = this.email.asObservable();
  constructor(private cookieService: CookieService,private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred.';
       
        if (error.status === 500 && error.error.message == 'Email is not verified') {
          errorMessage = 'Email not verified';
          sessionStorage.setItem("email",credentials.email);
          setTimeout(()=>{
            this.router.navigateByUrl('verify-email');
          },2000)
         
        } else if (error.status === 500 && error.error.message === "Invalid email or password") {
          // Use a code from the API response for precise handling
          errorMessage = "Invalid email or password.";
        }
        
        return throwError(() => ({
          code: error.error?.code || '500',
          message: errorMessage
        }));
        
      }),
      tap((response: any) => {
        localStorage.setItem('token', response.accessToken);
        this.cookieService.set('refresh_token',response.refreshToken ,{
          expires: new Date(response.refreshTokenExpiryTime), // Convert expiryTime to Date object
          path: '/', // Makes the cookie available across the site
          secure: true, // Ensures it's only sent over HTTPS
          sameSite: 'Strict' // Prevents CSRF attacks
        });
        setTimeout(()=>{
          this.refreshTokenSubject.next(response.refreshToken);
        },2000);
      })
    )
  }

  verifyEmail(email:string,code:string){
    return this.http.post(this.apiUrl+'/Email-Verification',{email,code}).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = 'An unknown error occurred.';
        if (error.status === 500 && error.error.message == "Email or code doesn't exist") {
          errorMessage = 'Invalid credentials';
          this.router.navigateByUrl('verify-email');
        } else if (error.status === 500 && error.error.message === "Email doesn't exist") {
          // Use a code from the API response for precise handling
          errorMessage = "Error : Email doesn't exist";
        }
        
        return throwError(() => ({
          code: error.error?.code || '500',
          message: errorMessage
        }));
      }),
      tap((response: any) => {
        
        localStorage.setItem('token', response.accessToken);
        this.refreshTokenSubject.next(response.refreshToken);
        this.cookieService.set('refresh_token',response.refreshToken ,{
          expires: new Date(response.refreshTokenExpiryTime), // Convert expiryTime to Date object
          path: '/', // Makes the cookie available across the site
          secure: true, // Ensures it's only sent over HTTPS
          sameSite: 'Strict' // Prevents CSRF attacks
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/home');
        },2000);
        
      })
    )
  }

  getRefreshToken() {
    return this.cookieService.get('refresh_token');
  }
  logout() {
    this.cookieService.delete('refresh_token');
    localStorage.removeItem('token');
    this.refreshTokenSubject.next('');

  }
  resendEmail(email:string){
    return this.http.post(this.apiUrl+'/Send-Email',{email}).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = 'An unknown error occurred.';
        if (error.status === 500 && error.error.message === "Email doesn't exist") {
          // Use a code from the API response for precise handling
          errorMessage = "Error : Email doesn't exist";
        }
        
        return throwError(() => ({
          code: error.error?.code || '500',
          message: errorMessage
        }));
      }),
      tap((response: any) => {
        
        
        
      })
    )
  }
}
