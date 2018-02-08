import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/forkJoin';
// import 'rxjs/add/operator/pipe';
import { OpenLetterService } from './open-letter.service';
import { ViewContainerService } from '../../view-container.service';

@Component({
  selector: 'app-open-letter',
  templateUrl: './open-letter.component.html',
  styleUrls: ['./open-letter.component.css']
})
export class OpenLetterComponent implements OnInit {

  // public text: string;
  public letter;

  constructor(
    private _openLetterService: OpenLetterService,
    private _activatedRoute: ActivatedRoute,
    private _viewContainerService: ViewContainerService
  ) { }

  ngOnInit() {


    this._activatedRoute.params
      // .pluck('id')
      .switchMap((params: { id: string, box: string }) => {
        return Observable
          .forkJoin(
          this._openLetterService.getLetterText(params),
          this._openLetterService.getLetterData(params),
          (a, b) => {
            return this.letter = {
              text: a,
              data: b
            };
          });
      })
      .subscribe((letter) => this.letter = letter);

  }

}
