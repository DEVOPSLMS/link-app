import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7174/api";
  constructor() { }
 getCollection(){
  return this.http.get(this.apiUrl+"/link/collection",{withCredentials:true}).pipe(
  
    tap((response:any)=>{
      console.log(response);
    }),
   

  )
 }
 addCollection(){
  return this.http.post(this.apiUrl+"/link/create-collection",{},{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }
}
