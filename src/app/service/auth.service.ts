import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, Observable, take, tap, throwError } from 'rxjs';

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
  private accessToken: string | null = null;
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  accessToken$ = this.accessTokenSubject.asObservable();
  constructor(private cookieService: CookieService,private router: Router) { }
  setAccessToken(token: string): void {
    this.accessTokenSubject.next(token);
  }
  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }
  clearAccessToken(): void {
    this.accessTokenSubject.next(null);
  }
  refreshToken(){
    return this.http.post(this.apiUrl+'/refresh-token',{},{withCredentials:true})
  }
  revokeRefresh(){
   
    return this.http.post(this.apiUrl+'/revoke-refresh-token',{},{withCredentials:true}).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log(error);
        return throwError(()=>({

        }));
      }),
      tap((response:any)=>{
        console.log(response)
        
      })
    )
  }
  getEmail(){
    return this.http.post(this.apiUrl+'/email',{},{withCredentials:true});
  }
  login(credentials: { email: string; password: string }): Observable<any> {

    return this.http.post(this.apiUrl + '/login', credentials, { withCredentials: true }).pipe(
      
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred.';
        console.log(error)
        console.log(error.error.message)
        if (error.status === 500 && error.error.message == 'An unknown error occurred.') {
          errorMessage = 'Email not verified';
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
        console.log(response)
        this.setAccessToken(response.accessToken);
        this.cookieService.set('refresh_token','true' );
        setTimeout(()=>{
          
          this.refreshTokenSubject.next('true');
        },2000);
      }),
     
    )
  }

  verifyEmail(email:string,code:string): Observable<any>{
 
    return this.http.post(this.apiUrl+'/Email-Verification',{ email, code:code.toString() },{ withCredentials: true }).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = 'An unknown error occurred.';
        console.log(error)
        if (error.status === 500 && error.error.message == "Email or code doesn't exist") {
          errorMessage = 'Invalid credentials';
    
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
        
        this.setAccessToken(response.accessToken);
        this.refreshTokenSubject.next('true');
        this.cookieService.set('refresh_token','true' );
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
    this.refreshTokenSubject.next('');
    this.router.navigateByUrl("home");
   
    
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
