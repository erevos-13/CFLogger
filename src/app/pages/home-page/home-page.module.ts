import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomePageRoutingModule} from "./home-page-routing.module";
import {HomePageComponent} from "./home-page.component";
import {JumbotronComponent} from "../../modules/jumbotron/jumbotron.component";
import {TranslateModule} from "@ngx-translate/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports:[
    CommonModule,
    HomePageRoutingModule,
    NgbModule,
    TranslateModule.forChild()
  ],
  declarations:[
    HomePageComponent,
    JumbotronComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {

}
