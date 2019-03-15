import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../servrices/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SESSION_STORAGE, StorageService} from "ngx-webstorage-service";
import {Settings} from "../../servrices/settings";
import StorageValues = Settings.StorageValues;

@Component({
  selector: 'app-submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.scss']
})
export class SubmitScoreComponent implements OnInit {

  protected submitForm: FormGroup;
  private submitScoreUser: IScoreForm;
  constructor(
    private userSrv:UsersService,
    private formBuilder: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,

  ) { }

  ngOnInit() {
    this.initSubmit();

    this.submitForm = this.formBuilder.group({
      score: [this.submitScoreUser.score, Validators.required],
    });

  }

  initSubmit() {
    this.submitScoreUser = {
      score: null
    }
  }


  submitScoreOfUser(){

    this.userSrv.addSubmitScoreFn(this.storage.get(StorageValues.USER_ID),this.submitForm.get('score').value,2,'any').subscribe(() =>{}, error => {console.log(error)});

  }

} // END CLASS


export  interface IScoreForm {
  score?:string;
}
