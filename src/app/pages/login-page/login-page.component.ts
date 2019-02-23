import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../servrices/users.service';
import {FormBuilder, FormGroup,  Validators} from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopUpComponent} from "../../modules/pop-up/pop-up.component";


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
    private modalService: NgbModal

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
    localStorage.setItem( 'rememberPassword', this.loginInForm.value.rememberPassword.toString());
    this.userSrv.userAuth(this.loginInForm.value.username, this.loginInForm.value.password)
      .then((res) => {
        this.router.navigate(['/home']).catch((error) => {
          console.log(error);
        });
      }).catch((err) => {
        // TODO: make a modal info.
      console.log(err);
      const modalRef = this.modalService.open(PopUpComponent);
      modalRef.componentInstance.name = "Something when wrong in the login. ";
      modalRef.componentInstance.title = "ERROR";
      this.router.navigate(['']).catch((err) => {
        console.log(err)});
    });


  }

} // END CLASS

export interface ILoginUser {
  username: string;
  password: string;
  rememberPassword: boolean;
}
