import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationToolbarComponent } from './operation-toolbar/operation-toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [OperationToolbarComponent],
  exports: [
    OperationToolbarComponent
  ]
})
export class OperationToolbarModule { }
