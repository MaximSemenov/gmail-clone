import { concat } from 'rxjs/observable/concat';
import 'rxjs/add/operator/pluck';
import { Component, OnInit } from '@angular/core';
import { MailService, Mail } from '../../mail/mail.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public inboxListLength: number;
  public inboxUnreadLength: number;
  public spamUnreadLength: number;
  public mailBoxName: string;
  public isCategoriesMenuOpen = true;

  constructor(private _mailService: MailService) { }

  ngOnInit(): void {

    this._mailService.getCurrentMailBoxLength().subscribe((length: number) => {
      this.inboxListLength = length;

    });


    this._mailService.getUnreadMailLength().subscribe(arrayOfLengths => {
      this.inboxUnreadLength = arrayOfLengths[0]['inbox'];
      this.spamUnreadLength = arrayOfLengths[1]['inbox'];

    });

  }

}
