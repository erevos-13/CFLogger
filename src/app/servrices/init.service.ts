import {Inject, Injectable} from '@angular/core';
import {Settings} from "./settings";
import StorageValues = Settings.StorageValues;
import { LOCAL_STORAGE,SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import * as _ from 'lodash';
import UserValues = Settings.UserValues;

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    // private storageSrv: StorageService
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken: string = this.storage.get(StorageValues.ACCESS_TOKEN);
      const userId: string= this.storage.get(StorageValues.USER_ID);
      const rememberPassword: string = this.storage.get(StorageValues.REMEMBER_PASSWORD);
      if(rememberPassword){
        if(!_.isNil(accessToken) && !_.isNil(userId)) {
          console.log({userSrvAccess: accessToken});
          UserValues.ACCESS_TOKEN = this.storage.get(StorageValues.ACCESS_TOKEN);
          UserValues.USER_ID = this.storage.get(StorageValues.USER_ID);
          resolve();
          return;
        }
        reject();
        return;
      }
      reject();






    });
  }

} //END CLASS
