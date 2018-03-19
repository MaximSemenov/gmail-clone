import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailService } from './mail.service';
import { RouterModule } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { OpenLetterComponent } from './mail/open-letter/open-letter.component';
import { OpenLetterService } from './mail/open-letter/open-letter.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MailComponent,
    OpenLetterComponent
  ],
  exports: [

  ],
  providers: [MailService, OpenLetterService]
})
export class MailModule { }
