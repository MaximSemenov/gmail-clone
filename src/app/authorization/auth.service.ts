import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  constructor() { }


  isAuth(loginObject) {
    // return Observable.of(Math.random() >= 0.8);
    if (loginObject['login'] === 'demo' && loginObject['password'] === 'demo') {
      return Observable.of(true);
    }
    return Observable.of(false);
  }




}
