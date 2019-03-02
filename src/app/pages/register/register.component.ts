import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import {UsersService} from "../../servrices/users.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {Settings} from "../../servrices/settings";
import PIC_USERS = Settings.PIC_PATHS.PIC_USERS;
import { Router} from "@angular/router";
import {SESSION_STORAGE, StorageService} from "ngx-webstorage-service";
import StorageValues = Settings.StorageValues;


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
  private picSelected: string;
  private picIsSelected: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
     private formBuilder: FormBuilder,
    private userSrv: UsersService,
    private storage: AngularFireStorage,
    private router: Router,
    @Inject(SESSION_STORAGE) private storageSrv: StorageService,
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


  selectPic(event) {
    this.picIsSelected = true;
    this.picSelected = event.target.files[0];
  }



  uploadFile(userId_: string) {
    const file =this.picSelected;
    const filePath = `${PIC_USERS}/${userId_}`;
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
        this.router.navigate(['home/log-list']).catch(err => {
          console.log(err);
        })
      }, err => {

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
    if(!this.picIsSelected) {
      return;
    }

    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.registerForm.value.email,this.registerForm.value.password)
      .then((user) => {
        console.log(user);
        this.storageSrv.set(StorageValues.ACCESS_TOKEN,user.user.refreshToken);
        this.storageSrv.set(StorageValues.USER_ID, user.user.uid);
        this.userSrv.addUserMetadata(user.user.uid,1,this.registerForm.value )
          .then((metadata) => {
            console.log(metadata);
            this.uploadFile(user.user.uid);
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
