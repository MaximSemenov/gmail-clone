
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

export type Mail = [

  {
    id: string;
    name: string;
    title: string;
    body: string;
    isRead: boolean;
    isChecked: boolean;
    email: string;
  }
];



@Injectable()
export class MailService {

  private _mailList$$: Subject<Mail[]> = new Subject();
  private _currentMailBoxName$$: BehaviorSubject<string> = new BehaviorSubject('inbox');
  private _currentPage$$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _mailBoxLength$$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _lastSearch$$: BehaviorSubject<string> = new BehaviorSubject(null);
  private _currentlyCheckedLetter$$: Subject<Mail | Mail[]> = new Subject();


  private _snapshotUrls = {
    inbox: './assets/data/inbox-list.json',
    sent: './assets/data/sent-list.json'
  };


  constructor(private _http: HttpClient) {
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

  loadMailList(mailBoxName: string, query: string, page: number): Observable<Mail[]> {
    return this._http.get<Mail[]>(this._snapshotUrls[mailBoxName])
      .map(this._filterMailBySearch(query))
      .do((mailList: Mail[]) => {
        this._mailBoxLength$$.next(mailList.length);
      })
      .map(this._filterMailByPage(page))
      .delay(300)
      .do((mailList: Mail[]) => {
        this._lastSearch$$.next(query);
        this._currentMailBoxName$$.next(mailBoxName);
        this._currentPage$$.next(+page);
        this._mailList$$.next(mailList);
      });
  }


  getMailBoxLength(mailBoxName: string): Observable<number> {
    // return this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).map((mailList: Mail[]) => mailList.length);
    return this._mailBoxLength$$.asObservable();
  }


  private _filterMailBySearch(query: string): (mailList: Mail[]) => Mail[] {

    return (mailList): Mail[] => {

      if (!query) {

        return mailList;
      }


      return mailList.filter((mail: Mail) => {
        let result = false;
        ['name', 'email', 'title', 'body'].forEach(key => {
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

      if (!page || mailList.length < 6) {
        return mailList;
      }

      return mailList = mailList.slice(page * 5 - 5, page * 5);
    };
  }


  checkLetter(letter) {
    this._currentlyCheckedLetter$$.next(letter);
  }


}
