import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "../../servrices/users.service";
import {TranslateService} from "@ngx-translate/core";

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
              private translate: TranslateService
  ) { }

  ngOnInit() {
    const element =  document.querySelector('.modal-content');
    element.classList.add('animated', 'bounceIn');
  }


  private onLogout() {
    this.activeModal.dismiss();
    this.userSrv.logoutUser()
      .then()
      .catch()
  }

}
