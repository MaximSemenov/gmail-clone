import { concat } from 'rxjs/observable/concat';
import 'rxjs/add/operator/pluck';
import { Component, OnInit } from '@angular/core';
import { MailService, Mail } from '../../mail/mail.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('mymail', [
      state('notDone', style({
        opacity: 0
      })),
      state('done', style({
        opacity: 1
      })),
      transition('notDone => done', animate('400ms'))
    ])

  ]
})
export class ListComponent implements OnInit {

  public inboxListLength: number;
  public inboxUnreadLength: number;
  public spamUnreadLength: number;
  public mailBoxName: string;
  public isCategoriesMenuOpen = true;

  constructor(private _mailService: MailService) { }

  ngOnInit(): void {

    this._mailService.getCurrentMailBoxLength('inbox').subscribe((length: number) => {
      this.inboxListLength = length;

    });


    this._mailService.getUnreadMailLength().subscribe(arrayOfLengths => {
      this.inboxUnreadLength = arrayOfLengths[0]['inbox'];
      this.spamUnreadLength = arrayOfLengths[1]['inbox'];

    });

  }

}
