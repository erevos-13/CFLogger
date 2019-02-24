import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  protected listCart: IlistLog[] = [];

  constructor() {
  }

  ngOnInit() {
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
