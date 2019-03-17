import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../servrices/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SESSION_STORAGE, StorageService} from "ngx-webstorage-service";
import {Settings} from "../../servrices/settings";
import StorageValues = Settings.StorageValues;
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {IWodById, WodService} from "../../servrices/wod.service";
import {WodsDTO} from "../../RestApi/Models/wods-dto";
import RESOURCES_TYPES = Settings.RESOURCES_TYPES;
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {NgbTimepickerConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.scss']
})
export class SubmitScoreComponent implements OnInit {

  protected typeOfwod = STATE;
  protected state:STATE;
  protected wod:IWodById;
  protected resources = RESOURCES_TYPES;
  protected time = {hour: 0, minute: 0,second:0};

  protected submitForm: FormGroup;
  private submitScoreUser: IScoreForm;
  constructor(
    private userSrv:UsersService,
    private formBuilder: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private route: ActivatedRoute,
    private logger: NGXLogger,
    private wodSrv: WodService,
    protected translate: TranslateService,
    private config: NgbTimepickerConfig


  ) {
    config.seconds = true;
  }

  ngOnInit() {

    this.initSubmit();
    this.submitForm = this.formBuilder.group({
      score: [this.submitScoreUser.score, Validators.required],
    });
    const id:string = this.route.snapshot.paramMap.get('wodId');
    this.logger.info(id);
    this.wodSrv.getWodById(id).subscribe(
      (wod: IWodById) => {
        this.logger.log(wod);
        this.state = wod.wodById.typeOfWod;
        this.wod = wod;


      });




  }

  initSubmit() {
    this.submitScoreUser = {
      score: null
    }
  }


  submitScoreOfUser(){
    if(this.submitForm.invalid) {
      return;
    }

    const submitScore: IScore = this.submitForm.get('score').value;
    const inputScore: string = `${submitScore.hour}:${submitScore.minute}:${submitScore.second}`;

    const sub: Subscription = this.userSrv.addSubmitScoreFn(this.storage.get(StorageValues.USER_ID),inputScore,this.wod.wodById.typeOfWod,this.wod.wodById.id)
      .subscribe((result) =>{
        //TODO: insert model
        sub.unsubscribe();
        this.logger.log(result);
      }, error => {
        sub.unsubscribe();
        this.logger.error(error)
      }
        );

  }

} // END CLASS


export  interface IScoreForm {
  score?:IScore;
}

export interface IScore {
  hour: number;
  minute:number;
  second:number;
}


enum STATE {
  AMARP =  1,
  FOR_TIME = 2,
  REPS = 3
}
