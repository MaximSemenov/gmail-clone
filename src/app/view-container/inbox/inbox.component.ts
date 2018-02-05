import { Component, OnInit } from '@angular/core';
import { ViewContainerService} from '../view-container.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {

  public inboxList;

  constructor(private _viewContainerService: ViewContainerService) { }

  ngOnInit() {
    // this._viewContainerService.getMailBoxSnapshot('inbox').subscribe(inboxList => this.inboxList = inboxList);


  }





}
