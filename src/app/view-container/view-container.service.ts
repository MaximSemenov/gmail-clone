
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
    email: string;
  }
];



@Injectable()
export class ViewContainerService {

  private _mailList$$: Subject<Mail[]> = new Subject();
  private _currentMailBoxName$$: Subject<string> = new Subject();
  private _currentPage$$: Subject<number> = new Subject();


  private _snapshotUrls = {
    inbox: './assets/data/inbox-list.json',
    sent: './assets/data/sent-list.json'
  };


  constructor(private _http: HttpClient) {

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

  loadMailList(mailBoxName: string, query: string, query2: number): Observable<Mail[]> {
    return this._http.get<Mail[]>(this._snapshotUrls[mailBoxName])
      .map(this._filterMail(query))
      .map(this._filterMailByPage(query2))
      .delay(1500)
      .do((mailList: Mail[]) => {
        this._currentMailBoxName$$.next(mailBoxName);
        this._currentPage$$.next(query2);
        this._mailList$$.next(mailList);
      });
  }

  getMailBoxLength(mailBoxName: string): Observable<number> {
    return this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).map((mailList: Mail[]) => mailList.length);
  }


  private _filterMail(query: string): (mailList: Mail[]) => Mail[] {

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
      return mailList = mailList.slice(page * 5 - 5, page * 5);
    };
  }


}

