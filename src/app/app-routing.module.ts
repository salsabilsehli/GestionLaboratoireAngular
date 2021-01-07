import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./main/dashboard/dashboard.component";
import {MemberListComponent} from "./main/member/member-list/member-list.component";
import {MemberFormComponent} from "./main/member/member-form/member-form.component";
import {ToolsListComponent} from "./main/outils/tools-list/tools-list.component";
import {ToolsFormComponent} from "./main/outils/tools-form/tools-form.component";
import {ArticlesListComponent} from "./main/publications/articles-list/articles-list.component";
import {ArticlesFormComponent} from "./main/publications/articles-form/articles-form.component";
import {EventsListComponent} from "./main/events/events-list/events-list.component";
import {EventsFormComponent} from "./main/events/events-form/events-form.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolsListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolsFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolsFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'articles',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticlesListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ArticlesFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ArticlesFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventsListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventsFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventsFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
