import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourcesApi {

  constructor(
    private httpApi: HttpClient
  ) { }

  resourecsByItemId(itemId: string): Observable<any | object> {
    const params_ = new HttpParams().set('itemId',itemId);
    return this.httpApi.get(`${environment.URL_DEV}/api/Resources`,
      {params:params_});
  }

} // END CLASS
