import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { MailService, Mail } from '../mail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/observable/combineLatest';



export type MailLoadData = {
  lastSearch: string | null;
  page: number;
  mailBoxName: string;
};


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


    Observable.combineLatest(
      this._mailService.getLastSearch(),
      this._activatedRoute.queryParams.pluck('page').filter(Boolean),
      this._activatedRoute.params.pluck('box').filter(Boolean),
      this._mailService.transferedLetters(),
      (lastSearch, page, mailBoxName, a ) => {
        return {
          lastSearch,
          page,
          mailBoxName
        };
      }
    ).do((obj: MailLoadData) => {

      this.mailBoxName = obj.mailBoxName;
      this._mailService.updateCurrentMailBoxName(obj.mailBoxName);

    })
      .switchMap((obj: MailLoadData) => {
        this.mailBoxName = obj.mailBoxName;
        this._mailService.updateCurrentMailBoxName(obj.mailBoxName);
        return this._mailService.loadMailList(obj.mailBoxName, obj.lastSearch, obj.page);
      })
      .subscribe((mailList: Mail[]) => {

        this.isMailListLoaded = 'done';
      });

    this.mailList$ = this._mailService.getMailList();

  }
  //   this._activatedRoute.params
  //     .pluck('box')
  //     .filter(Boolean)
  //     .do((mailBoxName: string) => {
  //       this.mailBoxName = mailBoxName;
  //       this._mailService.updateCurrentMailBoxName(mailBoxName);

  //       this._router.navigate([], { queryParams: { page: 1 }, relativeTo: this._activatedRoute });
  //     })
  //     .switchMap((box: string): Observable<Mail[]> => {

  //       return this._mailService.loadMailList(box, null, 1);

  //     })
  //     .subscribe(() => this.isMailListLoaded = 'done');

  //   this.mailList$ = this._mailService.getMailList();

  // }

  checkLetters(letter: Mail, isChecked: boolean): void {

    this._mailService.storeSelectedLettersIndividually(letter, isChecked);

  }

  labelLetter(labelName: string, state: boolean, id: number) {

    this._mailService.selectedLetters.push(id);
    this._mailService.modifyLabels(labelName, state, this.mailBoxName)
      .subscribe(() => {
        this._mailService.clearSelectedLetters();
      });
  }



}
