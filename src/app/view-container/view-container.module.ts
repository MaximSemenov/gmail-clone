import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewContainerService } from './view-container.service';
import { RouterModule } from '@angular/router';
import { MailComponent } from './mail/mail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MailComponent
  ],
  exports: [

  ],
  providers: [ViewContainerService]
})
export class ViewContainerModule { }
