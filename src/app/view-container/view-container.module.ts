import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewContainerComponent } from './view-container/view-container.component';
import { ViewContainerService } from './view-container.service';
import { InboxComponent } from './inbox/inbox.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ViewContainerComponent, InboxComponent],
  exports: [
    ViewContainerComponent
  ],
  providers: [ViewContainerService]
})
export class ViewContainerModule { }
