import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "../@root/shared.module";
import {LayoutComponent} from './layout/layout.component';
import { ToolsListComponent } from './main/outils/tools-list/tools-list.component';
import { ToolsFormComponent } from './main/outils/tools-form/tools-form.component';
import { ArticlesListComponent } from './main/publications/articles-list/articles-list.component';
import { ArticlesFormComponent } from './main/publications/articles-form/articles-form.component';
import { EventsListComponent } from './main/events/events-list/events-list.component';
import { EventsFormComponent } from './main/events/events-form/events-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    MemberFormComponent,
    ToolsListComponent,
    ToolsFormComponent,
    ArticlesListComponent,
    ArticlesFormComponent,
    EventsListComponent,
    EventsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
