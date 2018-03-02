import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  private _checkStatus$$: Subject<boolean> = new Subject();

  constructor() { }


  checkPassword(loginObject): void {
    if (loginObject['login'] === 'demo' && loginObject['password'] === 'demo') {
      this._checkStatus$$.next(true);
      return;
    }
    this._checkStatus$$.next(false);
  }

  isAuth(): Observable<boolean> {

    return this._checkStatus$$.asObservable();

  }
}
