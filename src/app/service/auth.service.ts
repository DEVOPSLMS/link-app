import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { EncryptionService } from './encryption.service';

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
  
  constructor(private cookieService: CookieService,private router: Router,private encryptService:EncryptionService) { }
  setAccessToken(token: string): void {
    this.accessTokenSubject.next(token);
  
  }

  getAccessToken(): Observable<string> {
    return this.http.post<{ access_token: string }>(this.apiUrl + '/get-access-token', {}, { withCredentials: true })
      .pipe(
        tap((response:any)=>{
          console.log(response)
          console.log("hello")
        })
        
      );
  }
  clearAccessToken(): void {
    this.accessTokenSubject.next(null);
  }
  refreshToken(){
    return this.http.post(this.apiUrl+'/refresh-token',{},{withCredentials:true})
  }

  getEmail(){
    return this.http.post(this.apiUrl+'/email',{},{withCredentials:true});
  }
  register(email:string,FirstName:string,LastName:string,password:string):Observable<any>{
    return this.http.post(this.apiUrl+'/register',{email,FirstName,LastName,password}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(() => ({
          code: error.error?.code || '500',
          
        }));
      }),
      tap((response:any)=>{
        console.log(response);
        setTimeout(() => {
          this.router.navigateByUrl("/verify-email");
        }, 2000);
       
      })
    )
  }
  login(credentials: { email: string, password: string }): Observable<any> {
    
    return this.http.post(this.apiUrl + '/login', credentials, { withCredentials: true }).pipe(
      
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred.';
        console.log(error)
        console.log(error.error.message)
        if (error.status === 0 ) {
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

        setTimeout(()=>{
          this.router.navigateByUrl('/home');
        },2000);
        
      })
    )
  }


  logout() {

    this.refreshTokenSubject.next('');
    this.router.navigateByUrl("home");
    this.userLogout().subscribe({})
    
  }
  userLogout(){
    return this.http.post(this.apiUrl+'/logout',{},{withCredentials:true});
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
  verifyUser(){
    return this.http.post(this.apiUrl+'check',{},{withCredentials:true}).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(()=>({
          code:error.error?.code || '500'
        }))
      }),
    )
  }
}
