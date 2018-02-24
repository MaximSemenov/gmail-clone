import { Component, OnInit } from '@angular/core';
import { MailService } from '../../mail/mail.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public inboxListLength: number;

  constructor(private _mailService: MailService) { }

  ngOnInit(): void {
    this._mailService.getMailBoxLength('inbox').subscribe((length: number) => this.inboxListLength = length);
  }

}
