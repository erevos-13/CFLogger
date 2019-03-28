import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateWodComponent} from "./create-wod.component";
import {DynamicFormBuilderModule} from "../../components/dynamic-form-builder/dynamic-form-builder.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreateWodComponent],
  imports: [
    CommonModule,
    DynamicFormBuilderModule,
    TranslateModule.forChild(),
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    CreateWodComponent
  ],
})
export class CreateWodModule { }
