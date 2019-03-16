import { Injectable } from '@angular/core';
import {WodApi} from "../RestApi/wod-api";
import {Observable, Subscription} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {WodsDTO} from "../RestApi/Models/wods-dto";
import {ResourcesService} from "./resources.service";

@Injectable({
  providedIn: 'root'
})
export class WodService {

  constructor(
    private wodApi: WodApi,
    private logger: NGXLogger,
    private resourcesSrv: ResourcesService
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


  getWodById(wodId: string):Observable<IWodById>{
    return Observable.create(observer => {

      let sub$_: Subscription = this.wodApi.wodById(wodId).subscribe(
        (wodById) => {
          sub$_.unsubscribe();
          this.logger.log(wodById);
          sub$_ = this.resourcesSrv.getResourcesById(wodId).subscribe(
            (wodWithRes) => {
              this.logger.log(wodWithRes);
              observer.next({wodById: wodById,resources: wodWithRes});

            }, error => {
              this.logger.error(error);
              observer.error(error);

            }
          );

        },error => {
          sub$_.unsubscribe();
          this.logger.error(error);
          observer.error(error);
        }
      )

    });
  }

} // END CLASS

export interface IWodById {
  wodById: WodsDTO,
  resources: any
}
