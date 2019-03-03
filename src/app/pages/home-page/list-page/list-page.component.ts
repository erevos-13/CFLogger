import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import * as _ from 'lodash';
import {WodService} from "../../../servrices/wod.service";
import {NGXLogger} from "ngx-logger";


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private wodsSrv: WodService,
    private logger: NGXLogger
  ) { }

  ngOnInit() {

    this.wodsSrv.getAllWods().subscribe(
      (wods) => {
        this.logger.log('responces of wods')
      },err => {
        this.logger.error(err);
      }
    )

  }



}
