import { Component, OnInit } from '@angular/core';
import { ViewContainerService } from '../../view-container/view-container.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
// import {forkJoin} from 'rxjs/observable/forkJoin';

import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-operation-toolbar',
  templateUrl: './operation-toolbar.component.html',
  styleUrls: ['./operation-toolbar.component.css']
})
export class OperationToolbarComponent implements OnInit {

  public currentPage = 1;
  public numberOfLetters: number;
  public firstLetter = 1;
  public lastLetter = 5;
  public obj;


  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._viewContainerService.getCurrentBoxName()
      .switchMap((mailBoxName: string) => {
        // console.log('я тут в mailbox');
        return this._viewContainerService.getMailBoxLength(mailBoxName);
      })
      .subscribe((numberOfLetters: number) => {
        this.numberOfLetters = numberOfLetters;
        if (numberOfLetters <= 5) {
          this.firstLetter = numberOfLetters - numberOfLetters + 1;
          this.lastLetter = numberOfLetters;
        }
      });


    // Observable.combineLatest(
    //   this._viewContainerService.getCurrentBoxName(),
    //   Observable.of([1, 2, 4, 6, 7]),
    //   this._viewContainerService.getMailBoxLength('inbox'),
    //   Observable.of([11, 22, 44, 65, 76]),
    //   (mailboxName, length) => {
    //     return {
    //       mailboxName,
    //       length,
    //     };
    //   }
    // ).do(obj => {
    //   console.log('Object');
    //   console.log(obj);
    //   this.obj = obj;
    // })
    //   .switchMap(obj => {
    //     return this._activatedRoute.queryParams;
    //   }).switchMap(page => {
    //     console.log(page.page);
    //     console.log('ready to involke function')
    //     return this._viewContainerService.loadMailList(this.obj.mailboxName, this._viewContainerService.getLastSearch(), page.page);
    //   })
    //   .subscribe();



    this._activatedRoute.queryParams
      .pluck('page')
      .filter(Boolean)
      .do((page: string) => {
        this.currentPage = +page;
      })
      .switchMap((page: string) => {
        console.log('again in params');
    
        return combineLatest(
          this._viewContainerService.getCurrentBoxName().first(),
          this._viewContainerService.getLastSearch().first(),
          Observable.of(page),
          (mailBoxName, lastSearch, page) => {
            console.log(lastSearch);
            return {
              mailBoxName,
              lastSearch,
              page
            };
          }
        );
      })
      .delay(1000)
      .switchMap((queryObject) => {

        console.log(queryObject);
        return this._viewContainerService.loadMailList(
          queryObject.mailBoxName,
          queryObject.lastSearch,
          +queryObject.page);

      })

      .subscribe();



  }
  goNextPage(page) {

    if (this.numberOfLetters / this.currentPage < 5 || page >= this.numberOfLetters / 5) {
      return;
    }

    if (this.numberOfLetters < 10) {
      this.firstLetter = Math.ceil(this.numberOfLetters / 2);
      this.lastLetter = this.numberOfLetters;
      return;
    }

    this.lastLetter = this.lastLetter + 5;
    this.firstLetter = this.firstLetter + 5;


  }

  // goPreviousPage() {

  //   if (this.firstLetter === 1) {
  //     return;
  //   }
  //   this.lastLetter = this.lastLetter - 5;
  //   this.firstLetter = this.firstLetter - 5;
  // }
}
