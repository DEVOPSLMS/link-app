import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private http = inject(HttpClient);
  
  private apiUrl = "https://localhost:44398/api";
  constructor() { }
 getCollection(){
  return this.http.get(this.apiUrl+"/link/collection-by-user",{withCredentials:true}).pipe(
    catchError(error=> EMPTY),
  
    tap((response:any)=>{
      
    }),
   

  )
 }
 addCollection(collectionName:string){
  var created=new Date();  
  return this.http.post(this.apiUrl+"/link/collection-add",{collectionName,created},{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }
}
