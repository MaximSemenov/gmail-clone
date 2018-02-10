import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolBarComponent } from './main-toolbar/main-toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MainToolBarComponent],
  exports: [
    MainToolBarComponent
  ]
})
export class MainToolBarModule { }
