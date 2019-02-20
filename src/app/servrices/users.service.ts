import { Injectable } from '@angular/core';
import {IuserAuth, UserApi} from '../restApi/user-api';
import {stringDistance} from 'codelyzer/util/utils';
import {p} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userApi: UserApi
  ) {}

  public userAuth(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const input: IuserAuth = {
        email: username,
        password: password
      };
      this.userApi.authUser(input)
        .then((auth) => {
          console.log(auth);
          resolve(auth);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }


} // END CLASS
