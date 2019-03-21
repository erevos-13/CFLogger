import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopUpComponent} from "../../modules/pop-up/pop-up.component";
import {Router, Routes} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {LogOutComponent} from "../../modules/log-out/log-out.component";
import {UsersService} from "../../servrices/users.service";
import {UserDTO} from "../../RestApi/user-api";
import * as _ from 'lodash';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private infoUser: UserDTO;

  constructor(
    private config: NgbDropdownConfig,
    private modalService: NgbModal,
    private router: Router,
    private translateSrv: TranslateService,
    private userSrv: UsersService
  ) {
    config.placement = "bottom-right";
    config.autoClose = false;
  }

  ngOnInit() {
    console.log('home page');


  }


  private onLogout() {
    const modalRef = this.modalService.open(LogOutComponent);
    modalRef.componentInstance.name = this.translateSrv.instant('LOGOUT_MESSAGE');
    modalRef.componentInstance.title = this.translateSrv.instant('LOGOUT_TITLE');
  }


} // END CLASS

