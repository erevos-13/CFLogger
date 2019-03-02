import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {UsersService} from "../../servrices/users.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerUser:IRegister;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private afAuth: AngularFireAuth,
     private formBuilder: FormBuilder,
    private userSrv: UsersService,
    private storage: AngularFireStorage
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



  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'picIrl';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
      .subscribe((result) => {
        console.log(result);
      })
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
        this.userSrv.addUserMetadata(user.user.uid,1)
          .then((metadata) => {
            console.log(metadata);
          })
          .catch((err) => {
            console.log(err);
          })

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
