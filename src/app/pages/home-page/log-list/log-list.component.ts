import {Component, OnInit} from '@angular/core';
import {IUser, UsersService} from "../../../servrices/users.service";
import {BasePage} from "../../base-page";
import {NGXLogger} from "ngx-logger";
import {NgbProgressbarConfig} from "@ng-bootstrap/ng-bootstrap";
import {Settings} from "../../../servrices/settings";
import METADATA_KEY = Settings.METADATA_KEY;
import {MetadataDTO} from "../../../RestApi/user-api";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent extends BasePage implements OnInit {
  protected listCart: IlistLog[] = [];
  protected user: IUser;
  protected userName: string;
  protected userLastName: string;


  constructor(
    private userSrv: UsersService,
    private logger: NGXLogger,
    private configBar: NgbProgressbarConfig

  ) {
    super();
  }

  ngOnInit() {
    this.configBar.max = 100;
    this.configBar.striped = true;
    this.configBar.animated = true;
    this.configBar.height = '20px';

    this.userSrv.getUserProfile().subscribe(
      (user: IUser) => {
        this.logger.debug(user);
        this.user = user;
        this.userName = user.metadata[METADATA_KEY.FIRST_NAME];
        this.userLastName = user.metadata[METADATA_KEY.SURNAME];

      }, error => {
        this.logger.error(error);
      });



    this.listCart = [
      {
        title: 'Title 1',
        subTitle: 'Sub Title'
      },
      {
        title: 'Title 2',
        subTitle: 'Sub title 2'
      }
    ];
  }

} // END CLASS

export interface IlistLog {
  title: string;
  subTitle: string;
}
