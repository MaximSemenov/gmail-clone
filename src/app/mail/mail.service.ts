import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

export type Mail = {
  id: number;
  title: string;
  body: string;
  isRead: boolean;
  isChecked: boolean;
  isStarred: boolean;
  isImportant: boolean;
  email: string;
  fullName: string;
  date: string;
};



@Injectable()
export class MailService {

  private _baseUrl: string = environment.baseUrl;
  private _getMailUrl = 'mail';
  private _transferMailUrl = 'mailTransfer';
  private _mailUnread = 'mailUnread';
  private _setLetterLabel = 'labelMail.php';


  private _operationMenuStatus$$: Subject<number> = new Subject();
  private _mailList$$: BehaviorSubject<any> = new BehaviorSubject([]);
  private _currentMailBoxName$$: BehaviorSubject<string> = new BehaviorSubject('inbox');
  private _currentPage$$: BehaviorSubject<number> = new BehaviorSubject(1);
  private _mailBoxLength$$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _unreadLength$$: Subject<any> = new Subject();
  private _lastSearch$$: BehaviorSubject<string> = new BehaviorSubject(null);
  private _currentlyCheckedLetter$$: Subject<Mail | Mail[]> = new Subject();
  private _mailListCache$: Observable<Mail[]>;
  public selectedLetters: number[] = []; // temporary public temporary solution!
  // private _transferedLetterd$$: Subject<any> = new Subject();
  private _transferedLetterd$$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) {
  }

  transferedLetters() {
    return this._transferedLetterd$$.asObservable();
  }

  getOperationMenuStatus() {
    return this._operationMenuStatus$$.asObservable();
  }

  getCheckedLetter() {
    return this._currentlyCheckedLetter$$.asObservable();
  }

  getLastSearch() {
    return this._lastSearch$$.asObservable();
  }


  getCurrentPage(): Observable<number> {
    return this._currentPage$$.asObservable();
  }

  getCurrentBoxName(): Observable<string> {
    return this._currentMailBoxName$$.asObservable();
  }


  getMailList(): Observable<Mail[]> {
    return this._mailList$$.asObservable();
  }

  updateLastSearch(query) {
    this._lastSearch$$.next(query);
  }

  updateCurrentMailBoxName(mailBoxName: string) {
    this._currentMailBoxName$$.next(mailBoxName);
  }

  updateMailTransfer() {
    this._transferedLetterd$$.next(null);
  }


  loadMailList(mailBoxName: string, query: string, page: number): Observable<Mail[]> {

    return this._http.get<Mail[]>(this._baseUrl + this._getMailUrl, {
      params: { 'box': mailBoxName }
    })
      .map(this._filterMailBySearch(query))
      .do((mailList: Mail[]) => {
        this._mailBoxLength$$.next(mailList.length);
      })
      .map(this._filterMailByPage(page))
      .map((filteredMailList: Mail[]) => {

        return filteredMailList.map(letterObj => {
          letterObj.isChecked = !!+letterObj.isChecked;
          letterObj.isRead = !!+letterObj.isRead;
          letterObj.isStarred = !!+letterObj.isStarred;
          letterObj.isImportant = !!+letterObj.isImportant;
          return letterObj;
        });
      })
      .delay(800)
      .do((mailList: Mail[]) => {
        this._mailList$$.next(mailList);
      });
  }

  getCurrentMailBoxLength(): Observable<number> {

    return this._mailBoxLength$$.asObservable();
  }



  getUnreadMailLength() {

    return this._http.get<any>(this._baseUrl + this._mailUnread, {
      params: {
        'boxes[]': ['inbox', 'spam']
      }
    });

  }

  private _filterMailBySearch(query: string): (mailList: Mail[]) => Mail[] {

    return (mailList): Mail[] => {

      if (!query) {

        return mailList;
      }


      return mailList.filter((mail: Mail) => {
        let result = false;
        ['fullName', 'email', 'title', 'body'].forEach(key => {
          if (mail[key].toLowerCase().includes(query.toLowerCase())) {
            result = true;
          }
        });

        return result;
      });
    };

  }

  private _filterMailByPage(page): (mailList: Mail[]) => Mail[] {

    return (mailList): Mail[] => {

      if (!page || mailList.length < 10) {
        return mailList;
      }

      return mailList = mailList.slice(page * 10 - 10, page * 10);
    };
  }


  storeSelectedLettersIndividually(letter: Mail, isChecked: boolean): void {

    if (!isChecked) {
      this.selectedLetters = this.selectedLetters.filter((id: number) => id !== letter.id);
      this._operationMenuStatus$$.next(this.selectedLetters.length);
      return;
    }

    this.selectedLetters.push(letter.id);
    this._operationMenuStatus$$.next(this.selectedLetters.length);
  }


  storeSelectedLettersAll(mailList: Mail[]): void {
    mailList.forEach(letter => {
      this.selectedLetters.push(letter.id);
    });

    if (!mailList[0].isChecked) {
      this.selectedLetters.length = 0;
    }

  }


  transferLetter(fromBox: string, toBox: string): Observable<any> {

    return this._http.get<any>(this._baseUrl + this._transferMailUrl, {
      params: {
        'transferFrom': fromBox,
        'transferTo': toBox,
        'id[]': this.selectedLetters.map(String)
      }

    });



  }

  clearSelectedLetters(): void {
    this.selectedLetters.length = 0;
  }


  modifyLabels(labelName: string, state: boolean, mailBoxName: string): Observable<any> {

    console.log(this.selectedLetters.map(String));
    return this._http.get<any>(this._baseUrl + this._setLetterLabel, {
      params: {
        'boxName': mailBoxName,
        'labelName': labelName,
        'state': String(state),
        'ids[]': this.selectedLetters.map(String)
      }

    });

  }


  deleteLetter() {


  }




}
