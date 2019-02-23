import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {reject} from 'q';
import {a} from "@angular/core/src/render3";
import {Observable} from "rxjs";
@Injectable()
export class UserApi {

  constructor(
    private httpApi: HttpClient
  ) {
  }


  public authUser(userAuth: IuserAuth): Promise<any> {
    return this.httpApi.post(`${environment.URL_DEV}/api/Users/login`,
      userAuth
    ).toPromise();
  }

  public logoutUser(accessToken: ILogout): Promise<any> {
    const params = new HttpParams().set('access_token',accessToken.access_token);
    return this.httpApi.post(`${environment.URL_DEV}/api/Users/logout`, null , {params}).toPromise();
  }


  public getUserProfile() : Observable<any> {
    return this.httpApi.get(`${environment.URL_DEV}/`);
  }

} // END CLASS


export interface ILogout {
  access_token: string;
}


export interface IuserAuth {
  email: string;
  password: string;
}


export interface ILoginRes {
  create: string;
  id: string;
  ttl: number;
  userId:string;
}
