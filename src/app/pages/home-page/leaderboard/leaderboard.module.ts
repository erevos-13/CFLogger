import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LeaderboardComponent} from "./leaderboard.component";
import {RouterModule} from "@angular/router";
import {LogListComponent} from "../log-list/log-list.component";
import {intersectionObserverPreset, LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  imports:[
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([{path: '',component:LeaderboardComponent}]),
    TranslateModule.forChild(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations:[
    LeaderboardComponent,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaderboardModule {

}
