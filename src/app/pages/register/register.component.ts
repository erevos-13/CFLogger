import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerUser:IRegister;

  constructor(
    private afAuth: AngularFireAuth,
     private formBuilder: FormBuilder
  ) { }

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
    if(this.registerForm.invalid) {
      return;
    }
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.registerForm.value.email,this.registerForm.value.password)
      .then((user) => {
        console.log(user);

      })
      .catch((error) =>{
        console.log(error);
      })

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
