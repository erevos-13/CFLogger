import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';


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
  {path:'create-wod', loadChildren:'./pages/create-wod/create-wod.module#CreateWodModule'},
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
