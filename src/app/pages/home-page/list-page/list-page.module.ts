import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {ListPageComponent} from "./list-page.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {SpinnerModule} from "../../../components/spinner/spinner.module";
import {intersectionObserverPreset, LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  imports:[
    CommonModule,
    SpinnerModule,
    RouterModule.forChild([{ path: '', component: ListPageComponent }]),
    TranslateModule.forChild(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })  ],
  declarations:[ListPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ListPageModule {

}
