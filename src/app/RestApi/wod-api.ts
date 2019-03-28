import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {WodsDTO} from "./Models/wods-dto";

@Injectable({
  providedIn: 'root'
})
export class WodApi {

  constructor(
    private httpApi: HttpClient
  ) { }


  public getAllWod(): Observable<WodsDTO[] | Object> {
    const headers: HttpHeaders = new HttpHeaders();
    const params: HttpParams = new HttpParams();
     return this.httpApi.get(`${environment.URL_DEV}/api/wods/wodAll`);
  }

  public wodById(wodId: string): Observable<WodsDTO | Object>{
    const params: HttpParams = new HttpParams().set('id',wodId);
    return this.httpApi.get(`${environment.URL_DEV}/api/wods/${wodId}`);
  }

  public addWod(wod: WodsDTO):Observable<WodsDTO | Object>{
    return this.httpApi.post(`${environment.URL_DEV}/api/wods/wod`,wod);
  }


} // END CLASS
