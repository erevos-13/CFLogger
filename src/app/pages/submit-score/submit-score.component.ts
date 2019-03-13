import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../servrices/users.service";

@Component({
  selector: 'app-submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.scss']
})
export class SubmitScoreComponent implements OnInit {

  constructor(
    private userSrv:UsersService
  ) { }

  ngOnInit() {
    this.userSrv.addSubmit().subscribe(() =>{},error => {console.log(error)});
  }

}
