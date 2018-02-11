
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ViewContainerService, Mail } from '../view-container.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/skipWhile';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  public mailList$: Mail[];
  public mailBoxName: string;

  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute) { }


  ngOnInit() {

    this._activatedRoute.params
      // .skipWhile(param => !param['box'])
      .pluck('box')
      .filter(Boolean)
      .switchMap((box: string): Observable<Mail[]> => {

        this.mailBoxName = box;
        return this._viewContainerService.loadMailList(box, 'Levi');
      }).subscribe();

   this._viewContainerService.getMailList().subscribe(mailList => {
    //  console.log(mailList)
     this.mailList$ = mailList;
   });


  }

}
