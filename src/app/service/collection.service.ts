import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import {
  CollectionModel,
  CollectionResponse,
  deleteCollection,
  editCollection,
  editCollectionPublic,
} from '../Models/collection_model';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7174/api';

  constructor() {}
  getCollection() {
    return this.http
      .get(this.apiUrl + '/link/collection-by-user', { withCredentials: true })
      .pipe(
        catchError((error) => EMPTY),

        tap((response: any) => {})
      );
  }
  getCollectionById(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http
      .get(this.apiUrl + '/link/collection-by-id', {
        params,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => EMPTY),

        tap((response: any) => {})
      );
  }
  getCollectionPrivate(privateKey: string) {
    const params = new HttpParams().set('privateKeyId', privateKey);
    return this.http
      .get(this.apiUrl + '/link/collection-private', {
        params,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => EMPTY),

        tap((response: any) => {})
      );
  }
  updateCollectionPrivate(id: string): Observable<CollectionResponse> {
    return this.http
      .put<CollectionResponse>(this.apiUrl + '/link/update-collection-private/' + id, {}, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Unauthorized request:', error);
            // Handle unauthorized error (e.g., redirect to login page)
          } else {
            console.error('Error updating collection to private:', error);
          }
          return throwError(() => error);
        }),
        tap((response: any) => {
          console.log(response);
        })
      );
  }
  addCollection(collectionName: string): Observable<CollectionResponse> {
    const collection: CollectionModel = {
      collectionName,
    };

    return this.http
      .post<CollectionResponse>(
        this.apiUrl + '/link/collection-add',
        collection,
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          console.log(response);
        })
      );
  }
  deleteCollection(id: string): Observable<any> {
    return this.http
      .delete(this.apiUrl + '/link/delete-collection/' + id, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          console.log(response);
        })
      );
  }
  editCollection(
    collectionName: string,
    id: string
  ): Observable<CollectionResponse> {
    const collection: editCollection = {
      collectionName,
    };
    return this.http
      .put<CollectionResponse>(
        this.apiUrl + '/link/update-collection/' + id,
        collection,
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          console.log(response);
        })
      );
  }
  editCollectionPublic(
    isPublic: boolean,
    id: string
  ): Observable<CollectionResponse> {
    const collection: editCollectionPublic = {
      isPublic,
    };
    return this.http
      .put<CollectionResponse>(
        this.apiUrl + '/link/update-collection-public/' + id,
        collection,
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          console.log(response);
        })
      );
  }
  searchCollection(search: string): Observable<CollectionResponse> {
    return this.http
      .post<CollectionResponse>(
        this.apiUrl + '/link/search',
        { search },
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          
        })
      );
  }
}
