import {Inject, Injectable} from '@angular/core';
import {ILoginRes, ILogout, IMetadataAdd, IuserAuth, MetadataDTO, UserApi, UserDTO} from '../RestApi/user-api';
import {Settings} from "./settings";
import UserValues = Settings.UserValues;
import { Observable, Subscription} from "rxjs";
import StorageValues = Settings.StorageValues;
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {NGXLogger} from "ngx-logger";
import {AngularFireAuth} from "@angular/fire/auth";
import * as _ from 'lodash';
import {User} from "firebase";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userApi: UserApi,
    private logger: NGXLogger,
    @Inject(SESSION_STORAGE) private storageSrv: StorageService,
    private afAuth: AngularFireAuth,
  ) {
  }

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
          this.storageSrv.set(StorageValues.USER_ID, auth.userId);
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

      const input: ILogout = {
        access_token: this.storageSrv.get(StorageValues.ACCESS_TOKEN)
      };
      this.afAuth.auth.signOut()
        .then(() => {
          this.storageSrv.remove(StorageValues.ACCESS_TOKEN);
          this.storageSrv.remove(StorageValues.USER_ID);
          resolve();
        })
        .catch(() => {
          reject()
        });

      // this.userApi.logoutUser(input)
      //   .then((logOut) => {
      //     console.log(logOut);
      //     this.storageSrv.remove(StorageValues.ACCESS_TOKEN);
      //     resolve();
      //   })
      //   .catch((error) => {
      //     this.storageSrv.remove(StorageValues.ACCESS_TOKEN);
      //     reject();
      //   });

    });
  }


  public getUserProfile(): Observable<IUser> {
    return Observable.create(observer => {
      let  user_: IUser;
        const sub: Subscription = this.userApi.getUserProfile(this.storageSrv.get(StorageValues.USER_ID), UserValues.ACCESS_TOKEN).subscribe(
          (userProfile: UserDTO) => {
            sub.unsubscribe();
            this.afAuth.user.subscribe((user) => {
              if(!_.isNil(user) && !_.isNil(userProfile)) {
                user_ = {data: user, metadata: userProfile.userDTO[0].metadata };
              }
              this.logger.log(user_);
              observer.next(user_);
            })

          }, error => {
            sub.unsubscribe();
            observer.error(error);
          });

        return () => {
          sub.unsubscribe();
        }
    });
  }


  public addUserMetadata(itemId: string, typeOfMetadata:number): Promise<any> {
    return new Promise((resolve, reject) => {

      const input_: IMetadataAdd = {
        itemId:itemId,
        metadatatypeId: typeOfMetadata,
        metadata: [
          {
            key: 'personal_last_name',
            value: 'test'
          }
        ]
      };
      this.userApi.addMetadata(input_).subscribe(
        (metadata) => {
          this.logger.log(metadata);
        }
      )

    });

  }


  public authWithToken(token: string): Observable<any> {
    return Observable.create(observer => {
      this.userApi.authToken_(token).subscribe(
        (result) => {
          this.logger.log(result);
          observer.next(result);
        },error => {
          this.logger.log(error);
          observer.error(error);
        }
      );
    });
  }

} // END CLASS

export interface IUser {
  data: User;
  metadata: MetadataDTO[];
}
