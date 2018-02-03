import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export type BoxList = [

  {
    sender: string;
    title: string;
    body: string;
    isRead: boolean;
  }
];

@Injectable()
export class ViewContainerService {

  constructor(private _http: HttpClient) { }


  getOverviewData(): Observable<BoxList[]> {

    return this._http.get<BoxList[]>('./assets/data/inbox-list.json');

  }

}
