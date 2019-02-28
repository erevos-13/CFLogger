import {Inject, Injectable} from '@angular/core';
import {Settings} from "./settings";
import StorageValues = Settings.StorageValues;
import { LOCAL_STORAGE,SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import * as _ from 'lodash';
import UserValues = Settings.UserValues;
import {AngularFireAuth} from "@angular/fire/auth";
import {NGXLogger} from "ngx-logger";
import {UsersService} from "./users.service";



@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    // private storageSrv: StorageService
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private afAuth: AngularFireAuth,
    private logger: NGXLogger,
    private userSrv:UsersService
  ) { }

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken: string = this.storage.get(StorageValues.ACCESS_TOKEN);
      const userId: string= this.storage.get(StorageValues.USER_ID);
      const rememberPassword: string = this.storage.get(StorageValues.REMEMBER_PASSWORD);
      this.afAuth.authState.subscribe((auth) => {
        this.logger.log(auth.refreshToken);
        if(auth.refreshToken === accessToken) {
          resolve();
        }else {
          this.storage.clear();
          reject();
        }
      },err => {
        this.storage.clear();
        reject();
      })

    });
  }

} //END CLASS
