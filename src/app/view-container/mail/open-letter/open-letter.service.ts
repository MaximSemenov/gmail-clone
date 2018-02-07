import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OpenLetterService {

  constructor(private _http: HttpClient) { }


  getText(id: string): Observable<any> {

    return this._http.get<any>('../../../../assets/data/inbox-letters.json')
    // .map(letter => letter.forEach(item => item = 7));
  }


}
