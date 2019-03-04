import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import * as _ from 'lodash';
import {WodService} from "../../../servrices/wod.service";
import {NGXLogger} from "ngx-logger";
import {WodsDTO} from "../../../RestApi/Models/wods-dto";
import {TranslateService} from "@ngx-translate/core";
import {Settings} from "../../../servrices/settings";
import RESOURCES_TYPES = Settings.RESOURCES_TYPES;


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  protected wods: WodsDTO[] = [];
  protected resources = RESOURCES_TYPES;



  constructor(
    private storage: AngularFireStorage,
    private wodsSrv: WodService,
    private logger: NGXLogger,
    protected translate: TranslateService
  ) { }

  ngOnInit() {
    this.logger.log(this.translate.currentLang);

    this.wodsSrv.getAllWods().subscribe(
      (wods: WodsDTO[]) => {
        this.logger.log(wods);
        this.wods = wods;
      },err => {
        this.logger.error(err);
      }
    )

  }



}
