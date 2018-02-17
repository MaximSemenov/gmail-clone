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
  public firstLetter = 1;
  public lastLetter = 5;

  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._viewContainerService.getCurrentBoxName()
      .switchMap((mailBoxName: string) => {
        return this._viewContainerService.getMailBoxLength(mailBoxName);
      })
      .switchMap((numberOfLetters: number) => {
        this.numberOfLetters = numberOfLetters;
        if (numberOfLetters <= 5) {
          this.firstLetter = numberOfLetters - numberOfLetters + 1;
          this.lastLetter = numberOfLetters;
        }


        return this._viewContainerService.getCurrentPage();
      })
      .subscribe();


    // this._viewContainerService.getCurrentPage()
    //   .subscribe((currentPage: number) => {
    //     this.currentPage = currentPage;

    //   });

    this._activatedRoute.queryParams
      .subscribe(currentPage => {
        this.currentPage = +currentPage.page;

      });

    this._activatedRoute.queryParams.switchMap((queryParams: { page: number }) => {
      console.log(queryParams);
      return this._viewContainerService.loadMailList('inbox', this._viewContainerService.getLastSearch(), queryParams.page);
    }

    ).subscribe();



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
