import { Component, OnInit } from '@angular/core';
import { MailService, Mail } from '../../mail/mail.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-operation-toolbar',
  templateUrl: './operation-toolbar.component.html',
  styleUrls: ['./operation-toolbar.component.css']
})
export class OperationToolbarComponent implements OnInit {

  public currentPage = 1;
  public numberOfLetters: number;
  public firstLetter = 1;
  public lastLetter = 10;
  public isSelectAllActive = false;
  public isOperationMenuShown = false;
  public isMoveToMenuShown = false;
  public mailList: Mail[];
  public mailBoxName: string;


  constructor(private _mailService: MailService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._mailService.getCurrentBoxName().subscribe((mailBoxName: string) => {
      this.mailBoxName = mailBoxName;
    });


    this._mailService.getMailList().subscribe((mailList: Mail[]) => {
      this.mailList = mailList;
    });

    this._mailService.getOperationMenuStatus().subscribe((arrayLength: number) => {

      if (!arrayLength) {
        this.isOperationMenuShown = false;
        this.isMoveToMenuShown = false;
      } else {
        this.isOperationMenuShown = true;
      }



    });



    this._mailService.getCurrentBoxName()
      .switchMap((mailBoxName: string) => {

        return this._mailService.getCurrentMailBoxLength(mailBoxName);
      })
      .filter(Boolean)
      .subscribe((numberOfLetters: number) => {

        this.numberOfLetters = numberOfLetters;
        if (numberOfLetters <= 10) {
          this.firstLetter = numberOfLetters - numberOfLetters + 1;
          this.lastLetter = numberOfLetters;
        }
      });



    this._activatedRoute.queryParams
      .pluck('page')
      .filter(Boolean)
      .subscribe((page: string) => {
        this.currentPage = +page;
      });




    // Observable.combineLatest(
    //   this._mailService.getCurrentBoxName(),
    //   this._mailService.getLastSearch(),
    //   this._activatedRoute.queryParams.pluck('page').filter(Boolean),
    //   (mailboxName, lastSearch, page) => {
    //     return {
    //       mailboxName,
    //       lastSearch,
    //       page
    //     };
    //   }
    // ).switchMap(obj => {
    //   return this._mailService.loadMailList(obj.mailboxName, obj.lastSearch, obj.page);
    // })
    //   .subscribe();


    Observable.combineLatest(
      this._mailService.getCurrentBoxName(),
      this._mailService.getLastSearch(),
      this._activatedRoute.queryParams.pluck('page').filter(Boolean),
      this._mailService.transferedLetters(),
      (mailboxName, lastSearch, page) => {
        return {
          mailboxName,
          lastSearch,
          page
        };
      }
    ).delay(500) // TODO: fake delay to have time to refresh the database it needs to be done by observable approach
      .switchMap(obj => {
        return this._mailService.loadMailList(obj.mailboxName, obj.lastSearch, obj.page);
      })
      .subscribe();



  }
  goNextPage(page: number): void {

    if (this.lastLetter === this.numberOfLetters) {
      return;
    }

    this.firstLetter = this.firstLetter + 10;
    this.lastLetter = this.numberOfLetters - this.firstLetter < 10 ?
      (this.numberOfLetters - this.firstLetter) + this.firstLetter : this.firstLetter + 10;
    return;

  }

  goPreviousPage(): void {

    if (this.firstLetter === 1) {
      return;
    }

    this.firstLetter = this.firstLetter - 10;
    this.lastLetter = this.firstLetter === 1 ? 10 * (this.currentPage - 1) : 10 * (this.currentPage - 1) + 1;
  }

  mailTransfer(destination: string): void {

    this._mailService.transferLetter(this.mailBoxName, destination)
      .subscribe(() => {
        this._mailService.updateMailTransfer();
        this._mailService.clearSelectedLetters();
        setTimeout(() => {
          this.isSelectAllActive = false;
        }, 500);
      });
  }


  selectAllLetters() {
    this.isSelectAllActive = !this.isSelectAllActive;
    if (!this.isSelectAllActive) {
      this.isMoveToMenuShown = false;
    }

    this.mailList.forEach(letter => {
      letter.isChecked = !letter.isChecked;
    });
    this._mailService.storeSelectedLettersAll(this.mailList);
  }

  labelLetter(labelName: string, state: boolean) {
    this._mailService.modifyLabels(labelName, state, this.mailBoxName)
      .subscribe(() => {
        this._mailService.clearSelectedLetters();
        this._mailService.updateMailTransfer();
      });
  }

}
