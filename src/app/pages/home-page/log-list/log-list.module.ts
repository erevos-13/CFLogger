import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {LogListComponent} from "./log-list.component";
import {TranslateModule} from "@ngx-translate/core";
import {intersectionObserverPreset, LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild([{path: '',component:LogListComponent}]),
    TranslateModule.forChild(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations:[LogListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LogListModule {

}
