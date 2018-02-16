import { OpenLetterComponent } from './view-container/mail/open-letter/open-letter.component';

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
import { MailComponent } from './view-container/mail/mail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [

  { path: '', redirectTo: 'mail/inbox', pathMatch: 'full' },
  { path: 'mail', redirectTo: 'mail/inbox', pathMatch: 'full' },
  { path: 'mail/:box', component: MailComponent },
  { path: 'mail/:box/:id', component: OpenLetterComponent }


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
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
