import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../servrices/users.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopUpComponent} from "../../modules/pop-up/pop-up.component";
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Settings} from "../../servrices/settings";
import StorageValues = Settings.StorageValues;
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  protected loginInForm: FormGroup;
  private userLogin: ILoginUser;
  private rememberPassword: boolean = false;

  constructor(
    private router: Router,
    private userSrv: UsersService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private afAuth: AngularFireAuth,
    private logger: NGXLogger
  ) {
  }

  ngOnInit() {
    this.initUser();
    this.loginInForm = this.formBuilder.group({
      username: [this.userLogin.username, Validators.required],
      password: [this.userLogin.password, Validators.required],
      rememberPassword: [this.userLogin.rememberPassword]
    });
  }

  private initUser() {
    this.userLogin = {
      password: null,
      username: null,
      rememberPassword: false
    }
  }


  public onSubmit() {
    if (this.loginInForm.invalid) {
      return;
    }
    this.storage.set(StorageValues.REMEMBER_PASSWORD, this.loginInForm.value.rememberPassword);
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.loginInForm.value.username, this.loginInForm.value.password)
      .then((auth: auth.UserCredential) => {
        this.logger.log(auth.user);
        this.storage.set(StorageValues.ACCESS_TOKEN,auth.user.refreshToken);
        this.storage.set(StorageValues.USER_ID, auth.user.uid);
        this.router.navigate(['/home/log-list']).catch((err) => {
          this.logger.error(err);
        });


      })
      .catch((error) => {
        const modalRef = this.modalService.open(PopUpComponent);
        modalRef.componentInstance.name = "Something when wrong in the login. ";
        modalRef.componentInstance.title = "ERROR";
        console.log(error);
      })
  }

  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

} // END CLASS

export interface ILoginUser {
  username: string;
  password: string;
  rememberPassword: boolean;
}
