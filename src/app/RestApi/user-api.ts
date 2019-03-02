import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
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


  public getUserProfile(userId:string,accessToken: string) : Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.httpApi.get(`${environment.URL_DEV}/api/Users/getUserProfile`,
      {params}
      );
  }

  public addMetadata(input: IMetadataAdd): Observable<any> {
    return this.httpApi.post(`${environment.URL_DEV}/api/metadata`,input);
  }

  public authToken_(token_:string): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('token',token_);
    headers = headers.set('returnSecureToken', 'true');
    headers = headers.set('Content-Type','application/json');

    const params = new HttpParams().set('key',environment.firebase.apiKey);
    return this.httpApi.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken`,null,{headers:headers,params:params});
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


export interface UserDTO {
  userDTO: {
    "realm": string;
    "username": string;
    "email": string;
    "emailVerified": boolean;
    "id": string;
    "metadata": MetadataDTO[];
  }
}

export interface MetadataDTO {

  "itemId": string;
  "metadata": IMetadata;

}

export interface IMetadata {
  value: string;
  key:string;
}

export interface IMetadataAdd {
  itemId: string;
  metadatatypeId: number;
  metadata: IMetadata[];
  id?: string;
}
