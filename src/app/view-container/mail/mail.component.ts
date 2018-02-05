import { Component, OnInit } from '@angular/core';
import { ViewContainerService, Mail } from '../view-container.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/skipWhile';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  public inboxList: Mail[];

  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute, private _router: Router) { }


  ngOnInit() {

    this._activatedRoute.params
      .skipWhile(param => !param['box'])
      .pluck('box')
      .subscribe(param => {
        this._viewContainerService.loadMailList(param);
      });

    this._viewContainerService.getMailList().subscribe((mailList: Mail[]) => this.inboxList = mailList);






    // this._viewContainerService.loadMailSnapshot().subscribe(inboxList => console.log(inboxList));

    // this._activatedRoute.params.subscribe(params => console.log(params));
    //  this._viewContainerService.loadMailSnapshot();



    // this._activatedRoute.params
    //   .skipWhile(param => !param['box'])
    //   .switchMap(param => {
    //     return this._viewContainerService.getMailList(param);

    //   }).subscribe(inboxList => this.inboxList = inboxList);

    // this._activatedRoute.params.skipWhile(param => !param['box']).subscribe((s) => console.log(s));




  }

}
