import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FieldConfig} from "../../modules/dynamic-form/models/field-config.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicFormComponent} from "../../modules/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-create-wod',
  templateUrl: './create-wod.component.html',
  styleUrls: ['./create-wod.component.scss']
})
export class CreateWodComponent implements OnInit {

  ngOnInit(): void {
  }


  public form: FormGroup;
  unsubcribe: any

  public fields: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: true,
    }
  ];

  constructor() {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  onUpload(e) {
    console.log(e);

  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }



} // END CLASS
