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

  public mailList: Mail[];
  public mailBoxName: string;

  constructor(private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute) { }


  ngOnInit() {

    this._activatedRoute.params
      .skipWhile(param => !param['box'])
      .pluck('box')
      .subscribe((param: string) => {

        this.mailBoxName = param;
        this._viewContainerService.loadMailList(param);
      });

    this._viewContainerService.getMailList().subscribe((mailList: Mail[]) => this.mailList = mailList);


  }

}
