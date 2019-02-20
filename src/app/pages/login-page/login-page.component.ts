import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../servrices/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private userSrv: UsersService
  ) {
  }

  ngOnInit() {
  }

  public onSubmit() {

    this.userSrv.userAuth('erevos@gmail.com', 'erevos')
      .then((res) => {
        this.router.navigate(['/home']).catch((error) => {
          console.log(error);
        });
      }).catch((err) => {
        // TODO: make a modal info.
      console.log(err);
    });


  }

}
