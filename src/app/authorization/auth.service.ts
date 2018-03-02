import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {

  private _checkStatus$$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

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
