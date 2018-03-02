import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroupControl: FormGroup;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.loginGroupControl = new FormGroup({

      login: new FormControl,
      password: new FormControl

    });

    // this.loginGroupControl.valueChanges.subscribe(x => console.log(x));

  }

  submitLogin() {


    this._authService.checkPassword(this.loginGroupControl.value);

    console.log(this.loginGroupControl.value);

  }

}
