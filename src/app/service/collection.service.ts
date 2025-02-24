import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { CollectionModel, CollectionResponse, deleteCollection, editCollection } from '../Models/collection_model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private http = inject(HttpClient);
  
  private apiUrl = "https://localhost:7174/api";
  
  constructor() { }
 getCollection(){
  return this.http.get(this.apiUrl+"/link/collection-by-user",{withCredentials:true}).pipe(
    catchError(error=> EMPTY),
  
    tap((response:any)=>{
      
    }),
   

  )
 }
 addCollection(collectionName:string):Observable<CollectionResponse>{
  const collection:CollectionModel={
    collectionName,
    
  };

  return this.http.post<CollectionResponse>(this.apiUrl+"/link/collection-add",collection,{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }
 deleteCollection(id:string):Observable<any>{

  return this.http.delete(this.apiUrl+"/link/delete-collection/"+id,{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }
 editCollection(collectionName:string,id:string):Observable<CollectionResponse>{
  const collection:editCollection={
    collectionName,
  };
  return this.http.put<CollectionResponse>(this.apiUrl+"/link/update-collection/"+id,collection,{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }
 searchCollection(search:string):Observable<CollectionResponse>{
  return this.http.post<CollectionResponse>(this.apiUrl+"/link/search", {search} ,{withCredentials:true}).pipe(
    tap((response:any)=>{
      console.log(response);
    })
  )
 }  
}
