import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OpenLetterService {

  private _snapshotUrls = {
    inbox: {
      letterData: '../../../../assets/data/inbox-list.json',
      letterText: '../../../../assets/data/inbox-letters.json'
    },
    sent: {
      letterData: '',
      letterText: ''
    }
  };

  constructor(private _http: HttpClient) { }


  getLetterText(params: { id: string, box: string }): Observable<any> {

    return this._http.get<any>(this._snapshotUrls[params.box].letterText)
      .map(letters => letters.find(letter => letter.id === params.id).text);
  }

  getLetterData(params: { id: string, box: string }): Observable<any> {
    return this._http.get<any>(this._snapshotUrls[params.box].letterData)
      .map(letterData => letterData.find(letter => letter.id === params.id))
      .map(letter => {
        return {
          title: letter.title,
          box: params.box,
          sender: letter.sender,
        };
      });
  }


}
