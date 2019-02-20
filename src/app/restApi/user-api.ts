import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {reject} from 'q';
@Injectable()
export class UserApi {

  constructor(
    private httpApi: HttpClient
  ) { }


  public async authUser(userAuth: IuserAuth): Promise<any> {
  return await this.httpApi.post(`${environment.URL_DEV}/api/Users/login`,
    userAuth
    ).toPromise().catch((error) =>  reject(error));
  }

} // END CLASS

export interface IuserAuth {
  email: string;
  password: string;
}
