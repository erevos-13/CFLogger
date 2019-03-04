import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../servrices/users.service";
import {UserDTO} from "../../RestApi/user-api";
import * as _ from 'lodash';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit{


  constructor(

  ) {}

  ngOnInit(): void {

  }


} //END CLASS
