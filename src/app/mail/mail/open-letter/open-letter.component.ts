import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/forkJoin';
// import 'rxjs/add/operator/pipe';
import { OpenLetterService } from './open-letter.service';
import { MailService } from '../../mail.service';

@Component({
  selector: 'app-open-letter',
  templateUrl: './open-letter.component.html',
  styleUrls: ['./open-letter.component.css']
})
export class OpenLetterComponent implements OnInit {

  public letter;
  public mailList;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mailService: MailService
  ) { }

  ngOnInit() {


    this._mailService.getMailList().switchMap(mailList => {
      this.mailList = mailList;
      return this._activatedRoute.params.pluck('id');
    }).subscribe(id => {
      this.letter = this.mailList.find(mail => mail.id === id);
    });


  }
}
