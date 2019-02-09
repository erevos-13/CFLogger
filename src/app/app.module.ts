import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import { LogListComponent } from './pages/log-list/log-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
