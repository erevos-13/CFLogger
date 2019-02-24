import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LogListComponent} from './pages/log-list/log-list.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ListPageComponent} from "./pages/home-page/list-page/list-page.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: '',  redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'log-list', component: LogListComponent},
  {
    path: 'home', component: HomePageComponent, children:[
      {path: 'list', component: ListPageComponent}
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {enableTracing: false}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
