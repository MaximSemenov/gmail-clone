import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginGroupControl: FormGroup;
  public loadingIndicator = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.loginGroupControl = new FormGroup({

      login: new FormControl,
      password: new FormControl

    });

    this._authService
      .isAuth()
      .subscribe((authStatus: boolean) => {
        console.log(authStatus);
        if (!authStatus) {

          this.loadingIndicator = false;
        }

        console.log(this.loadingIndicator);
      });

  }

  submitLogin() {

    this._authService.checkPassword(this.loginGroupControl.value);
    this.loadingIndicator = !this.loadingIndicator;
  }




}
