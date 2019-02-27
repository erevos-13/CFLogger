import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../servrices/users.service';
import {FormBuilder, FormGroup,  Validators} from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopUpComponent} from "../../modules/pop-up/pop-up.component";
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import {Settings} from "../../servrices/settings";
import StorageValues = Settings.StorageValues;
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from "angular-6-social-login";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  protected loginInForm: FormGroup;
  private userLogin: ILoginUser;
  private rememberPassword:boolean = false;

  constructor(
    private router: Router,
    private userSrv: UsersService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private socialAuthService: AuthService,
    @Inject(SESSION_STORAGE)private storage: StorageService,
    private afAuth: AngularFireAuth

  ) {
  }

  ngOnInit() {
    this.initUser();
    this.loginInForm = this.formBuilder.group({
      username: [this.userLogin.username, Validators.required],
      password: [this.userLogin.password, Validators.required],
      rememberPassword : [this.userLogin.rememberPassword]
    });
  }

  private socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else{
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...

      }
    );

  }

  private initUser() {
    this.userLogin = {
      password: null,
      username: null,
      rememberPassword:false
    }
  }




  public onSubmit() {
    if(this.loginInForm.invalid) {
      return;
    }
    this.storage.set(StorageValues.REMEMBER_PASSWORD,this.loginInForm.value.rememberPassword);
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.loginInForm.value.username,this.loginInForm.value.password)
      .then((auth) => {
        console.log(auth);
        this.router.navigate(['/home/log-list']).catch(() => {});
      })
      .catch((error) => {
        const modalRef = this.modalService.open(PopUpComponent);
        modalRef.componentInstance.name = "Something when wrong in the login. ";
        modalRef.componentInstance.title = "ERROR";
        console.log(error);
      })
  }

} // END CLASS

export interface ILoginUser {
  username: string;
  password: string;
  rememberPassword: boolean;
}
