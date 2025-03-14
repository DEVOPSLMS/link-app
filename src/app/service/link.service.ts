import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkModel, LinkResponse, UpdateLinkModel } from '../Models/link_model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private http = inject(HttpClient);
   
   private apiUrl = "https://localhost:7174/api";
   constructor() { }

   addLink(url:string,collectionId:string,tags:string,description:string):Observable<LinkResponse>{
    const linkModel:LinkModel={ 
      url,
      collectionId,
      tags,
      description
    }
     return this.http.post<LinkResponse>(this.apiUrl+"/link/create-url",linkModel,{withCredentials:true})
   }
   deleteLink(id:string):Observable<LinkResponse>{
     return this.http.delete<LinkResponse>(this.apiUrl+"/link/delete-url/"+id,{withCredentials:true})
   }
    editLink(url:string,tags:string,description:string,id:string):Observable<LinkResponse>{
      const UpdateLinkModel:UpdateLinkModel={ 
        url,
        tags,
        description
      }
      return this.http.put<LinkResponse>(this.apiUrl+"/link/update-url/"+id,UpdateLinkModel,{withCredentials:true})
    }
}
