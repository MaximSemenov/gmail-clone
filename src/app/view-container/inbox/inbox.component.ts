import { Component, OnInit } from '@angular/core';
import { ViewContainerService, BoxList } from '../view-container.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {

  public inboxList: BoxList[];

  constructor(private _viewContainerService: ViewContainerService) { }

  ngOnInit() {
    this._viewContainerService.getOverviewData().subscribe(inboxList => this.inboxList = inboxList);


  }





}
