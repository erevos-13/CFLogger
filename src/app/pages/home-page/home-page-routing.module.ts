import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./home-page.component";

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      {
        path: 'log-list', loadChildren: './log-list/log-list.module#LogListModule'
      },
      {
        path: 'list', loadChildren: './list-page/list-page.module#ListPageModule'
      },
      {
        path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardModule'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
