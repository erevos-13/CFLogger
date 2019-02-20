import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import { LogListComponent } from './pages/log-list/log-list.component';
import {JumbotronComponent} from './modules/jumbotron/jumbotron.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {UsersService} from './servrices/users.service';
import {UserApi} from './restApi/user-api';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogListComponent,
    JumbotronComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    UsersService,
    UserApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
