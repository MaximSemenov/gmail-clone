import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
    this._http.get<Mail[]>(this._snapshotUrls[mailBoxName]).subscribe((mailList: Mail[]) => this._mailList$$.next(mailList));
  }


}

