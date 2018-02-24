import { Component, OnInit } from '@angular/core';
import { MailService } from '../../mail/mail.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-operation-toolbar',
  templateUrl: './operation-toolbar.component.html',
  styleUrls: ['./operation-toolbar.component.css']
})
export class OperationToolbarComponent implements OnInit {

  public currentPage = 1;
  public numberOfLetters: number;
  public firstLetter = 1;
  public lastLetter = 5;
  public obj;


  constructor(private _mailService: MailService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._mailService.getCurrentBoxName()
      .switchMap((mailBoxName: string) => {

        return this._mailService.getMailBoxLength(mailBoxName);
      })
      .filter(Boolean)
      .subscribe((numberOfLetters: number) => {
        console.log(numberOfLetters);
        this.numberOfLetters = numberOfLetters;
        if (numberOfLetters <= 5) {
          this.firstLetter = numberOfLetters - numberOfLetters + 1;
          this.lastLetter = numberOfLetters;
        }
      });

    // Observable.combineLatest(
    //   this._mailService.getCurrentBoxName(),
    //   Observable.of([1, 2, 4, 6, 7]),
    //   this._mailService.getMailBoxLength('inbox'),
    //   Observable.of([11, 22, 44, 65, 76]),
    //   (mailboxName, length) => {
    //     return {
    //       mailboxName,
    //       length,
    //     };
    //   }
    // ).do(obj => {
    //   console.log('Object');
    //   console.log(obj);
    //   this.obj = obj;
    // })
    //   .switchMap(obj => {
    //     return this._activatedRoute.queryParams;
    //   }).switchMap(page => {
    //     console.log(page.page);
    //     console.log('ready to involke function')
    //     return this._mailService.loadMailList(this.obj.mailboxName, this._mailService.getLastSearch(), page.page);
    //   })
    //   .subscribe();

    this._activatedRoute.queryParams
      .pluck('page')
      .filter(Boolean)
      .do((page: string) => {
        this.currentPage = +page;
      })
      .switchMap((page: string) => {

        return combineLatest(
          this._mailService.getCurrentBoxName().first(),
          this._mailService.getLastSearch().first(),
          Observable.of(page),
          (mailBoxName, lastSearch, page) => {

            return {
              mailBoxName,
              lastSearch,
              page
            };
          }
        );
      })
      .switchMap((queryObject) => {

        return this._mailService.loadMailList(
          queryObject.mailBoxName,
          queryObject.lastSearch,
          +queryObject.page);

      }).subscribe();


    this._mailService.getCheckedLetter().subscribe(x => console.log(x));


  }
  goNextPage(page: number): void {

    if (this.lastLetter === this.numberOfLetters) {
      return;
    }

    this.firstLetter = this.firstLetter + 5;
    this.lastLetter = this.numberOfLetters - this.firstLetter < 5 ?
      (this.numberOfLetters - this.firstLetter) + this.firstLetter : this.firstLetter + 5;
    return;

  }

  goPreviousPage(): void {

    if (this.firstLetter === 1) {
      return;
    }

    this.lastLetter = 5 * (this.currentPage - 1);
    this.firstLetter = this.firstLetter - 5;

  }


}
