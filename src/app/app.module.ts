import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import {LogListComponent} from './pages/home-page/log-list/log-list.component';
import {JumbotronComponent} from './modules/jumbotron/jumbotron.component';
import {
  NgbDropdownConfig,
  NgbModule, NgbProgressbarConfig
} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {UsersService} from './servrices/users.service';
import {RestApiModule} from './RestApi/restApi.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import {PopUpComponent} from './modules/pop-up/pop-up.component';
import {ListPageComponent} from './pages/home-page/list-page/list-page.component';
import {LogOutComponent} from "./modules/log-out/log-out.component";
import {InitService} from "./servrices/init.service";
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { SocialLoginModule,  AuthServiceConfig,  GoogleLoginProvider,  FacebookLoginProvider} from "angular-6-social-login";
import { RegisterComponent } from './pages/register/register.component'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import {LeaderboardComponent} from "./pages/leaderboard/leaderboard.component";
import {SpinnerModule} from "./components/spinner/spinner.module";
import {MatFormFieldModule} from '@angular/material/form-field';
import {intersectionObserverPreset, LazyLoadImageModule} from "ng-lazyload-image";
import {SubmitScoreComponent} from "./pages/submit-score/submit-score.component";
import {MatSelectModule} from '@angular/material/select';
import {CreateWodComponent} from "./pages/create-wod/create-wod.component";
import {DynamicFormBuilderModule} from "./components/dynamic-form-builder/dynamic-form-builder.module";
import {DynamicFormBuilderComponent} from "./components/dynamic-form-builder/dynamic-form-builder.component";



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("815039622175637")
      }
    ]);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PopUpComponent,
    LogOutComponent,
    RegisterComponent,
    SkeletonComponent,
    LeaderboardComponent,
    SubmitScoreComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RestApiModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    StorageServiceModule,
    MatInputModule,
    MatFormFieldModule,
    SpinnerModule,
    MatSelectModule,
    FormsModule,
    DynamicFormBuilderModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,// imports firebase/storage only needed for storage features
    AngularFireModule.initializeApp(environment.firebase,'FcLogger'),
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    UsersService,
    NgbDropdownConfig,
    InitService,
    NgbProgressbarConfig,


    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopUpComponent,
    LogOutComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
