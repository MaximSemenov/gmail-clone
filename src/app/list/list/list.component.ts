import { Component, OnInit } from '@angular/core';
import { ViewContainerService } from '../../view-container/view-container.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public inboxListLength: number;

  constructor(private _viewContainerService: ViewContainerService) { }

  ngOnInit(): void {
  //   this._viewContainerService.getMailBoxSnapshot('inbox').subscribe(inboxList => this.inboxListLength = inboxList.length);
   }

}
