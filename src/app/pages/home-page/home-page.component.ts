import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private infoUser: IinfoUser;

  constructor() {
  }

  ngOnInit() {

    // HINT: dummy data.
    this.infoUser = {
      name: 'orfeas',
      surname: 'Voutsaridis',
      level: 1,
      box: 'Fight Box'
    };

  }

} // END CLASS

export interface IinfoUser {
  name: string;
  surname: string;
  level: number;
  box: string;
}
