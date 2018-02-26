import { OpenLetterComponent } from './mail/mail/open-letter/open-letter.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListModule } from './list/list.module';
import { MainToolBarModule } from './main-toolbar/main-toolbar.module';
import { OperationToolbarModule } from './operation-toolbar/operation-toolbar.module';
import { MailModule } from './mail/mail.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { MainToolBarComponent } from './main-toolbar/main-toolbar/main-toolbar.component';
import { MailComponent } from './mail/mail/mail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authorization/login/login.component';
import { AuthGuard } from './authorization/auth.guard';
import { AuthService } from './authorization/auth.service';
import { HomeComponent } from './home/home.component';



const appRoutes: Routes = [

  // { path: '', canActivate: [AuthGuard], redirectTo: 'mail/inbox', pathMatch: 'full' },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: '',  redirectTo: 'mail/inbox', pathMatch: 'full' },
  { path: '', redirectTo: 'mail/inbox', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'mail/:box/:id', component: OpenLetterComponent },
  // { path: 'mail', redirectTo: 'mail/inbox', pathMatch: 'full' },
  { path: 'mail/:box', component: MailComponent },



];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ListModule,
    MainToolBarModule,
    OperationToolbarModule,
    MailModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],

  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
