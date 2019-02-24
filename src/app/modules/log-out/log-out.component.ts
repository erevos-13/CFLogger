import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "../../servrices/users.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  @Input() name;
  @Input() title;
  constructor(public activeModal: NgbActiveModal,
              private userSrv:UsersService,
              private translate: TranslateService,
              private routers: Router
  ) { }

  ngOnInit() {
    const element =  document.querySelector('.modal-content');
    element.classList.add('animated', 'bounceIn');
  }


  private onLogout() {
    this.activeModal.dismiss();
    this.userSrv.logoutUser()
      .then(() => {
        this.routers.navigate(['/login']).catch();
      })
      .catch(() => {
        this.routers.navigate(['/login']).catch();
      })
  }

}
