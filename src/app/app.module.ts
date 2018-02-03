import { SentComponent } from './view-container/sent/sent.component';
import { ImportantComponent } from './view-container/important/important.component';
import { StarredComponent } from './view-container/starred/starred.component';
import { InboxComponent } from './view-container/inbox/inbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListModule } from './list/list.module';
import { MainToolBarModule } from './main-toolbar/main-toolbar.module';
import { OperationToolbarModule } from './operation-toolbar/operation-toolbar.module';
import { ViewContainerModule } from './view-container/view-container.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MainToolBarComponent } from './main-toolbar/main-toolbar/main-toolbar.component';
import { DraftsComponent } from './view-container/drafts/drafts.component';
import { SpamComponent } from './view-container/spam/spam.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
  { path: 'inbox', component: InboxComponent },
  { path: 'starred', component: StarredComponent },
  { path: 'important', component: ImportantComponent },
  { path: 'sent', component: SentComponent },
  { path: 'drafts', component: DraftsComponent },
  { path: 'spam', component: SpamComponent }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListModule,
    MainToolBarModule,
    OperationToolbarModule,
    ViewContainerModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
