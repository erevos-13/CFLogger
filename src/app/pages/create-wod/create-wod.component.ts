import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FieldConfig} from "../../modules/dynamic-form/models/field-config.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicFormComponent} from "../../modules/dynamic-form/dynamic-form.component";
import {NGXLogger} from "ngx-logger";
import {WodsDTO} from "../../RestApi/Models/wods-dto";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {WodService} from "../../servrices/wod.service";

@Component({
  selector: 'app-create-wod',
  templateUrl: './create-wod.component.html',
  styleUrls: ['./create-wod.component.scss']
})
export class CreateWodComponent implements OnInit {

  protected createWodFormGroup: FormGroup;
  private userCreateWod: WodsDTO;
  protected typesOfExercises:ITypeOfExercises[] = [];

  constructor(
    private logger: NGXLogger,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private wodSrv: WodService
  ) {
  }

  ngOnInit(): void {

    // set the type of exerc.
    this.typesOfExercises = [
      {value:1,text:'Amrap'},
      {value:2,text:'For time'},
      {value:3,text:'Max Reps'}
    ];

    this.initValuesOfForm();
    this.createWodFormGroup = this.formBuilder.group({
      nameWod : [this.userCreateWod.title, Validators.required],
      descriptions: [this.userCreateWod.descriptions, Validators.required],
      typeOfWod: [this.userCreateWod.typeOfWod, Validators.required],
      capTime: [this.userCreateWod.capTime, Validators.required],
    });
  }

  private initValuesOfForm() {
    this.userCreateWod = {
      capTime: null,
      title: null,
      typeOfWod: null,
      descriptions: null
    }
  }

  onUpload(e) {
    console.log(e);

  }

  onSubmit() {
    //TODO: i need to add the form to send the wod.
    if(this.createWodFormGroup.invalid){
      return;
    }
    this.logger.info(this.createWodFormGroup);
    const input_: WodsDTO = {
      descriptions: this.createWodFormGroup.value.descriptions,
      typeOfWod: this.createWodFormGroup.value.typeOfWod,
      title: this.createWodFormGroup.value.nameWod,
      capTime: this.createWodFormGroup.value.capTime
    };
    const  sub$_: Subscription = this.wodSrv.addWod(input_).subscribe(
      (result) =>{
        this.logger.log(result);
      },error => {
        this.logger.log(error);
      }
    );
  }






  ngDistroy() {
  }


} // END CLASS

export interface ITypeOfExercises {
  value: number;
  text: string;
}
