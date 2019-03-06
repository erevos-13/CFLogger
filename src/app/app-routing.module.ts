import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LogListComponent} from './pages/home-page/log-list/log-list.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ListPageComponent} from "./pages/home-page/list-page/list-page.component";
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LeaderboardComponent} from "./pages/leaderboard/leaderboard.component";

const routes: Routes = [
  {path: '',  redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent,pathMatch: 'full'},
  {path: 'log-list', component: LogListComponent,pathMatch: 'prefix'},
  {path: 'leaderboard', component: LeaderboardComponent},
  {
    path: 'home', component: HomePageComponent, children:[
      {path: 'list', component: ListPageComponent},
      {path: 'log-list', component: LogListComponent}
    ]
  },
  {path: 'register', redirectTo:'/register',},
  {path: 'register', component: RegisterComponent}
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
