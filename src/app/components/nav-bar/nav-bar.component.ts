import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {LogOutComponent} from "../../modules/log-out/log-out.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private config: NgbDropdownConfig,
    private translateSrv: TranslateService,
    private modalService: NgbModal,
    private router: Router,


  ) {
    config.placement = "bottom-right";
    config.autoClose = false;
  }

  ngOnInit() {
  }

  /**
   *
   */
  private onLogout() {
    const modalRef = this.modalService.open(LogOutComponent);
    modalRef.componentInstance.name = this.translateSrv.instant('LOGOUT_MESSAGE');
    modalRef.componentInstance.title = this.translateSrv.instant('LOGOUT_TITLE');
  }

}
