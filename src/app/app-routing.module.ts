import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {SubmitScoreComponent} from "./pages/submit-score/submit-score.component";
import {CreateWodComponent} from "./pages/create-wod/create-wod.component";


const routes: Routes = [
  {path: '',  redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent,pathMatch: 'full'},
  // {path: 'log-list', component: LogListComponent,pathMatch: 'prefix'},
  //
  // {
  //   path: 'home', component: HomePageComponent, children:[
  //     {path: 'list', component: ListPageComponent},
  //     {path: 'log-list', component: LogListComponent}
  //   ]
  // },
  {path:'home', loadChildren:'./pages/home-page/home-page.module#HomePageModule'},
  {path: 'home/create-wod',  redirectTo: '/create-wod', pathMatch: 'full'},
  {path:'create-wod', component:CreateWodComponent},
  {path:'home/submit-score', redirectTo:'/submit-score',pathMatch: 'full'},
  {path: 'submit-score',component:SubmitScoreComponent}
  // {path: 'register', redirectTo:'/register'},
  // {path: 'register', component: RegisterComponent},
  // // {path: 'submit-score',redirectTo:'/submit-score'},
  // {path: 'submit-score/:wodId', component: SubmitScoreComponent},
  // {path: 'create-wod',component:CreateWodComponent},

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
