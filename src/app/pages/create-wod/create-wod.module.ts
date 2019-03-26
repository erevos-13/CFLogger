import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateWodComponent} from "./create-wod.component";
import {DynamicFormBuilderModule} from "../../components/dynamic-form-builder/dynamic-form-builder.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [CreateWodComponent],
  imports: [
    CommonModule,
    DynamicFormBuilderModule,
    TranslateModule.forChild()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    CreateWodComponent
  ],
})
export class CreateWodModule { }
