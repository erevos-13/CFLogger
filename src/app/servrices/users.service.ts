import {Inject, Injectable} from '@angular/core';
import {ILoginRes, ILogout, IuserAuth, UserApi, UserDTO} from '../RestApi/user-api';
import {Settings} from "./settings";
import UserValues = Settings.UserValues;
import {Observable, Subscription} from "rxjs";
import StorageValues = Settings.StorageValues;
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userApi: UserApi,
    @Inject(SESSION_STORAGE) private storageSrv: StorageService
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
          this.storageSrv.set(StorageValues.ACCESS_TOKEN, auth.id);
          this.storageSrv.set(StorageValues.USER_ID,auth.userId);
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
        access_token: this.storageSrv.get(StorageValues.ACCESS_TOKEN)
      };

      this.userApi.logoutUser(input)
        .then((logOut) =>{
          console.log(logOut);
          this.storageSrv.remove(StorageValues.ACCESS_TOKEN);
          resolve();
        })
        .catch((error) => {
          this.storageSrv.remove(StorageValues.ACCESS_TOKEN);
          reject();
        });

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
