import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ViewContainerComponent } from './view-container/view-container.component';
import { ViewContainerService } from './view-container.service';
import { InboxComponent } from './inbox/inbox.component';
import { RouterModule } from '@angular/router';
import { StarredComponent } from './starred/starred.component';
import { ImportantComponent } from './important/important.component';
import { SentComponent } from './sent/sent.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SpamComponent } from './spam/spam.component';
import { MailComponent } from './mail/mail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    InboxComponent,
    StarredComponent,
    ImportantComponent,
    SentComponent,
    DraftsComponent,
    SpamComponent,
    MailComponent],
  exports: [

  ],
  providers: [ViewContainerService]
})
export class ViewContainerModule { }
