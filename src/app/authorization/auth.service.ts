import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  constructor() { }


isAuth () {
  return Observable.of(Math.random() >= 0.4);
}

}
