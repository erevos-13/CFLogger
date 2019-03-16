import { Injectable } from '@angular/core';
import {ResourcesApi} from "../RestApi/resourcesApi";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private resourcesApi: ResourcesApi
  ) { }

  getResourcesById(itemId: string): Observable<any> {
    return Observable.create(observer => {
      const sub$: Subscription = this.resourcesApi.resourecsByItemId(itemId)
        .subscribe((result: any) => {
          sub$.unsubscribe();
          observer.next(result);
          
        }, error => {
          sub$.unsubscribe();
          observer.error(error);
        });
    });

  }


} // END CLASS
