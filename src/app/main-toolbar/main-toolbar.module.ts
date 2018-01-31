import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolBarComponent } from './main-toolbar/main-toolbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainToolBarComponent],
  exports: [
    MainToolBarComponent
  ]
})
export class MainToolBarModule { }
