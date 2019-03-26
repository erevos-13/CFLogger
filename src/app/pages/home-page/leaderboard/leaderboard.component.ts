import { Component, OnInit } from '@angular/core';
import {LogOutComponent} from "../../../modules/log-out/log-out.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private translateSrv: TranslateService
  ) { }

  ngOnInit() {
  }
  private onLogout() {
    const modalRef = this.modalService.open(LogOutComponent);
    modalRef.componentInstance.name = this.translateSrv.instant('LOGOUT_MESSAGE');
    modalRef.componentInstance.title = this.translateSrv.instant('LOGOUT_TITLE');
  }

}
