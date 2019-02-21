import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../servrices/users.service';
import {FormBuilder, FormGroup,  Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {PopUpComponent} from '../../modules/pop-up/pop-up.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  protected loginInForm: FormGroup;
  private userLogin: ILoginUser;

  constructor(
    private router: Router,
    private userSrv: UsersService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog

  ) {
  }

  ngOnInit() {
    this.initUser();
    this.loginInForm = this.formBuilder.group({
      username: [this.userLogin.username, Validators.required],
      password: [this.userLogin.password, Validators.required]
    });
  }


  private initUser() {
    this.userLogin = {
      password: null,
      username: null
    }
  }




  public onSubmit() {
    if(this.loginInForm.invalid) {
      return;
    }
    this.userSrv.userAuth(this.userLogin.username, this.userLogin.password)
      .then((res) => {
        this.router.navigate(['/home']).catch((error) => {
          console.log(error);
        });
      }).catch((err) => {
        // TODO: make a modal info.
      console.log(err);
      this.dialog.open(PopUpComponent,{
        data:{
          animal: 'panta'
        }
      });
      this.router.navigate(['']).catch((err) => {
        console.log(err)});
    });


  }

} // END CLASS

export interface ILoginUser {
  username: string;
  password: string;
}
