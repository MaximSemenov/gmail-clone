import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListModule } from './list/list.module';
import { MainToolBarModule } from './main-toolbar/main-toolbar.module';
import { OperationToolbarModule } from './operation-toolbar/operation-toolbar.module';
import { ViewContainerModule } from './view-container/view-container.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListModule,
    MainToolBarModule,
    OperationToolbarModule,
    ViewContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
