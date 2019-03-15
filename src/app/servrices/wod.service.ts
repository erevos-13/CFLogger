import { Injectable } from '@angular/core';
import {WodApi} from "../RestApi/wod-api";
import {Observable, Subscription} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {WodsDTO} from "../RestApi/Models/wods-dto";

@Injectable({
  providedIn: 'root'
})
export class WodService {

  constructor(
    private wodApi: WodApi,
    private logger: NGXLogger
  ) { }

  public getAllWods(): Observable<WodsDTO[] > {
    return Observable.create(observer => {

      const sub$_: Subscription = this.wodApi.getAllWod().subscribe(
        (wods) => {
          observer.next(wods);
        },err => {
          this.logger.error(err);
          observer.error(err);
        })

    });
  }


  getWodById(wodId: string):Observable<WodsDTO>{
    return Observable.create(observer => {

      const sub$_: Subscription = this.wodApi.wodById(wodId).subscribe(
        (wodById) => {
          sub$_.unsubscribe();
          this.logger.log(wodById);
        },error => {
          sub$_.unsubscribe();
          this.logger.error(error);
        }
      )

    });
  }

} // END CLASS
