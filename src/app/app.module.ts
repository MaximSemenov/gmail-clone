
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

const appRoutes: Routes = [

  { path: '', redirectTo: 'mail', pathMatch: 'full' },
  { path: 'mail', component: MailComponent },
  { path: 'mail/:box', component: MailComponent }

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
