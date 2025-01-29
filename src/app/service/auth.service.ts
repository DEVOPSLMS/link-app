import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http=inject(HttpClient);
  private apiUrl="https://localhost:7174/api";
  private refreshTokenSubject = new BehaviorSubject<string>('');
  refreshToken$ = this.refreshTokenSubject.asObservable();
  constructor(private cookieService:CookieService) { }
  
  login(credentials: { email: string; password: string }): Observable<any>{
    return this.http.post(this.apiUrl+'/login',credentials,{withCredentials:true}).pipe(
      tap((response:any)=>{
        localStorage.setItem('token',response.accessToken);
        this.refreshTokenSubject.next(response.refreshToken); 
        this.cookieService.set('refresh_token',response.refreshToken);
      })
    )
  }
  getRefreshToken() {
    return this.cookieService.get('refresh_token');
  }
  logout(){
    this.cookieService.delete('refresh_token');
    localStorage.removeItem('access_token');
    this.refreshTokenSubject.next('');

  }
}
