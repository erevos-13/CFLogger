import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {InitService} from "./servrices/init.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private initSrv: InitService
  ) {
    translate.setDefaultLang('en');
    this.initSrv.init()
      .then(() => {
        console.log('app component');
        this.router.navigate(['/home/log-list']).catch((error) => {
          console.log(error)
        })
      })
      .catch(() => {
        this.router.navigate(['/login']).catch((error) => {
          console.log(error)
        })
      });


  }


}
