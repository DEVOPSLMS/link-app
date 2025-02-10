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
  return this.http.get(this.apiUrl+"/link/collection-by-user",{withCredentials:true}).pipe(
  
    tap((response:any)=>{
      
    }),
   

  )
 }
 addCollection(collectionName:string,parentCollectionId:string){
  return this.http.post(this.apiUrl+"/link/collection-add",{collectionName,parentCollectionId},{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }
}
