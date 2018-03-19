import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { MailService, Mail } from '../mail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
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
export class MailComponent implements OnInit {

  public mailList$: Observable<Mail[]>;
  public mailBoxName: string;
  public isMailListLoaded = 'done';

  constructor(private _mailService: MailService, private _activatedRoute: ActivatedRoute, private _router: Router) { }


  ngOnInit() {

    this._activatedRoute.params
      .pluck('box')
      .filter(Boolean)
      .do((mailBoxName: string) => {
        this.mailBoxName = mailBoxName;
        this._mailService.updateCurrentMailBoxName(mailBoxName);

        this._router.navigate([], { queryParams: { page: 1 }, relativeTo: this._activatedRoute });
      })
      .switchMap((box: string): Observable<Mail[]> => {

        return this._mailService.loadMailList(box, null, 1);

      })
      .subscribe(() => this.isMailListLoaded = 'done');

    this.mailList$ = this._mailService.getMailList();

  }

  checkLetters(letter: Mail): void {

    letter.isChecked = !letter.isChecked;
    this._mailService.storeCheckedLetters(letter, letter.isChecked);

  }



}
