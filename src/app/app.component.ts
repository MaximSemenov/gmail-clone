import { Component, OnInit } from '@angular/core';
import { AuthService } from './authorization/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public isLogin = false;

  constructor(private _authService: AuthService) {

  }

  ngOnInit() {
    this._authService.isAuth({ login: null, password: null }).subscribe((loginStatus: boolean) => {
      this.isLogin = loginStatus;
    });
  }

}
