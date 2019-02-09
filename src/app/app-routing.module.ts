import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LogListComponent} from './pages/log-list/log-list.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'log-list', component: LogListComponent},
  {path: 'home', component: HomePageComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
