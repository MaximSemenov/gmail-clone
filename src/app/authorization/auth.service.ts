import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {


  private _checkStatus$$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private _http: HttpClient) { }


  checkPassword(loginObject): void {
    if (loginObject['login'] === 'demo' && loginObject['password'] === 'demo') {
      this._checkStatus$$.next(true);
      return;
    }
    this._checkStatus$$.next(false);
  }

  isAuth(): Observable<boolean> {

    return this._checkStatus$$.asObservable().delay(2500);

  }


  phpRequest(): Observable<any> {
    return this._http.get('http://localhost/first.php');
  }

}
