import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MailService } from '../../mail/mail.service';
import { ActivatedRoute, Router, RoutesRecognized, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolBarComponent implements OnInit {

  public mailBoxName: string;
  public currentPage: number;
  public searchControl = new FormControl('');

  constructor(private _router: Router, private _mailService: MailService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._mailService.getCurrentBoxName().subscribe((mailBoxName: string) => this.mailBoxName = mailBoxName);
    this._mailService.getCurrentPage().subscribe((page: number) => this.currentPage = page);


    this.searchControl.valueChanges
      .subscribe((value: string) => {
        this._mailService.updateLastSearch(value);
      });


  }


}
