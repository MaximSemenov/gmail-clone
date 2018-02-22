import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ViewContainerService, Mail } from '../view-container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
  animations: [
    trigger('mymail', [
      state('notDone', style({
        opacity: 0
      })),
      state('done', style({
        opacity: 1
      })),
      transition('notDone => done', animate('400ms'))
    ])

  ]

})
export class MailComponent implements OnInit {

  public mailList$: Observable<Mail[]>;
  public mailBoxName: string;
  public isMailListLoaded = 'notDone';

  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute, private _router: Router) { }


  ngOnInit() {

    this._activatedRoute.params
      .pluck('box')
      .filter(Boolean)
      .do((box: string) => {
        this.mailBoxName = box;
        // this._router.navigate([''], { queryParams: { page: 1 } });
      })
      .switchMap((box: string): Observable<Mail[]> => {

        // return this._activatedRoute.queryParams.switchMap(queryParams => {
          return this._viewContainerService.loadMailList(box, null, 1);
        // });

      })
      .subscribe(() => this.isMailListLoaded = 'done');

    this.mailList$ = this._viewContainerService.getMailList();

    // this._activatedRoute
    //   .queryParams
    //   .subscribe(queryParams => {
    //     console.log(queryParams);

    //   });

  }

}
