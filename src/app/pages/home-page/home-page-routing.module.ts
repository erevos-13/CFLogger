import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./home-page.component";

const routes: Routes = [
  {
    path: '',component:HomePageComponent,
    children: [
      {
        path: '', children: [
          {path: '', loadChildren: './log-list/log-list.module#LogListModule'}
        ]
      },
      {
        path: 'list-page', children:
          [
            {path: '', loadChildren: './list-page/list-page.module#ListPageModule'}
          ]
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
