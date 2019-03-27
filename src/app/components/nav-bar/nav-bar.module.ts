import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "./nav-bar.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    NavBarComponent
  ]
})
export class NavBarModule { }
