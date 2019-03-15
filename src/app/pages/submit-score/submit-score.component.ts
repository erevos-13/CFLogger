import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../servrices/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SESSION_STORAGE, StorageService} from "ngx-webstorage-service";
import {Settings} from "../../servrices/settings";
import StorageValues = Settings.StorageValues;
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {WodService} from "../../servrices/wod.service";
import {WodsDTO} from "../../RestApi/Models/wods-dto";

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
    private route: ActivatedRoute,
    private logger: NGXLogger,
    private wodSrv: WodService

  ) { }

  ngOnInit() {
    const id:string = this.route.snapshot.paramMap.get('wodId');
    this.logger.info(id);
    this.wodSrv.getWodById(id).subscribe(
      (wod: WodsDTO) => {
        this.logger.log(wod)
      });
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
