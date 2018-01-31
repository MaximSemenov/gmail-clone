import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationToolbarComponent } from './operation-toolbar/operation-toolbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OperationToolbarComponent],
  exports: [
    OperationToolbarComponent
  ]
})
export class OperationToolbarModule { }
