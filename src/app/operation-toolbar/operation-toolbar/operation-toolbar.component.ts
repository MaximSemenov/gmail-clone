import { Component, OnInit } from '@angular/core';
import { ViewContainerService } from '../../view-container/view-container.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operation-toolbar',
  templateUrl: './operation-toolbar.component.html',
  styleUrls: ['./operation-toolbar.component.css']
})
export class OperationToolbarComponent implements OnInit {

  public currentPage: number;
  public numberOfLetters: number;
  public firstLetter: number;
  public lastLetter: number;

  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._viewContainerService.getCurrentBoxName()
      .switchMap((mailBoxName: string) => {
        return this._viewContainerService.getMailBoxLength(mailBoxName);
      })
      .subscribe((numberOfLetters: number) => {
        this.numberOfLetters = numberOfLetters;
      });

    this._viewContainerService.getCurrentPage()
      .subscribe((currentPage: number) => {

        this.currentPage = currentPage;
        this.firstLetter = currentPage * 5 - 5;
        this.lastLetter = currentPage * 5;
      });

    this._activatedRoute.queryParams.subscribe(queryParams => {
      this._viewContainerService.loadMailList('inbox', null, queryParams.page);
    });

  }

}
