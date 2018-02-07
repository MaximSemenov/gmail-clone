
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export type Mail = [

  {
    sender: string;
    title: string;
    body: string;
    isRead: boolean;
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

  loadMailList(mailBoxName) {
    // this._mailList$$.next(this._http.get<Mail[]>(this._snapshotUrls[mailBoxName['box']]));
    // this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).subscribe((mailList: Mail[]) => this._mailList$$.next(mailList));
    this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).subscribe((mailList: Mail[]) => {

      let x = [];
      mailList.forEach((item: Mail) => x.push(item.id));

      console.log(x.join(', '))

      return this._mailList$$.next(mailList);

    });
  }

  getMailBoxLength(mailBoxName: string): Observable<number> {
    return this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).map((mailList: Mail[]) => mailList.length);
  }

}

