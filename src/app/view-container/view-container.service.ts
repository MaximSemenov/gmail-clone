
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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

  private _snapshotUrls = {
    inbox: './assets/data/inbox-list.json',
    sent: './assets/data/sent-list.json'
  };


  constructor(private _http: HttpClient) { }


  getMailList(): Observable<Mail[]> {
    return this._mailList$$.asObservable();
  }

  loadMailList(mailBoxName: string): void {
    this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).subscribe((mailList: Mail[]) => this._mailList$$.next(mailList));
  }

  getMailBoxLength(mailBoxName: string): Observable<number> {
    return this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).map((mailList: Mail[]) => mailList.length);
  }

  liveMailSearch(value: string): void {

    this._mailList$$.take(1).subscribe((mailList: Mail[]) => {
      this.filterMail(mailList, value);
    });

    this.loadMailList('inbox');

  }


  filterMail(mailList: Mail[], value: string): void {


    const filteredMail = mailList.filter(item => {
      let result = false;
      ['name', 'email', 'title', 'body'].forEach(key => {
        if (item[key].toLowerCase().includes(value.toLowerCase())) {
          result = true;
        }
      });
      return result;
    });

    this._mailList$$.next(filteredMail);
  }


}

