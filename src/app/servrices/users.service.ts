import { Injectable } from '@angular/core';
import {ILoginRes, ILogout, IuserAuth, UserApi, UserDTO} from '../RestApi/user-api';
import {Settings} from "./settings";
import UserValues = Settings.UserValues;
import {Observable, Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userApi: UserApi
  ) {}

  public userAuth(username: string, password: string): Promise<ILoginRes> {
    return new Promise((resolve, reject) => {
      const input: IuserAuth = {
        email: username,
        password: password
      };
      this.userApi.authUser(input)
        .then((auth: ILoginRes) => {
          console.log(auth);
          UserValues.ACCESS_TOKEN = auth.id;
          UserValues.USER_ID = auth.userId;
          resolve(auth);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }


  public logoutUser(): Promise<any> {
    return new Promise((resolve, reject) => {

      const input: ILogout ={
        access_token: Settings.UserValues.ACCESS_TOKEN
      };

      this.userApi.logoutUser(input)
        .then(() =>{
          console.log('logout');
        })
        .catch();

    });
  }


  public getUserProfile(): Observable<UserDTO> {
    return Observable.create(observer => {

      const sub: Subscription = this.userApi.getUserProfile(UserValues.USER_ID,UserValues.ACCESS_TOKEN).subscribe(
        (user_: UserDTO) => {
          sub.unsubscribe();
          console.log(user_);
        });

    });
  }


} // END CLASS
