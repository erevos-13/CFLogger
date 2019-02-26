import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  formBuilder: FormBuilder;
  registerUser:IRegister;

  constructor() { }

  ngOnInit() {
    this.initUser();
    this.registerForm = this.formBuilder.group({
      username: [this.registerUser.username, Validators.required],
      password: [this.registerUser.password, Validators.required],
      box : [this.registerUser.box, Validators.required],
      firstName: [this.registerUser.firstName, Validators.required],
      lastName: [this.registerUser.lastName, Validators.required],
      email: [this.registerUser.email, Validators.required]
    });

  }

  /**
   *
   */
  private initUser() {
    this.registerUser = {
      password: null,
      username: null,
      box: null,
      email: null,
      firstName:null,
      lastName: null
    }
  }



  onRegister() {

  }

} // END CLASS

export interface IRegister {
  username?:string;
  firstName?:string;
  lastName?: string;
  box?:string;
  email?:string;
  password?:string;
}
