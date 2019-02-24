import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import {LogListComponent} from './pages/home-page/log-list/log-list.component';
import {JumbotronComponent} from './modules/jumbotron/jumbotron.component';
import {
  NgbDropdownConfig,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {UsersService} from './servrices/users.service';
import {RestApiModule} from './RestApi/restApi.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material';
import {PopUpComponent} from './modules/pop-up/pop-up.component';
import {ListPageComponent} from './pages/home-page/list-page/list-page.component';
import {LogOutComponent} from "./modules/log-out/log-out.component";
import {InitService} from "./servrices/init.service";
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogListComponent,
    JumbotronComponent,
    LoginPageComponent,
    PopUpComponent,
    ListPageComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RestApiModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    StorageServiceModule,
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    UsersService,
    NgbDropdownConfig,
    InitService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopUpComponent,
    LogOutComponent
  ]
})
export class AppModule {
}
