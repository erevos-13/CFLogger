import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateWodComponent} from "./create-wod.component";
import {DynamicFormBuilderModule} from "../../components/dynamic-form-builder/dynamic-form-builder.module";
import {DynamicFormBuilderComponent} from "../../components/dynamic-form-builder/dynamic-form-builder.component";

@NgModule({
  declarations: [CreateWodComponent],
  imports: [
    CommonModule,
  ],
  exports:[
    CreateWodComponent
  ],
})
export class CreateWodModule { }
