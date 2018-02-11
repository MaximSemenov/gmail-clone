import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewContainerService } from '../../view-container/view-container.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolBarComponent implements OnInit {
  public searchControl = new FormControl('');
  constructor(private _viewContainerService: ViewContainerService) { }

  ngOnInit() {
    // this.searchControl.valueChanges.subscribe((value: string) => this._viewContainerService.liveMailSearch(value));
    this.searchControl.valueChanges.subscribe((value: string) => {
      console.log('call loadMailList from mail toolbar');
      this._viewContainerService.loadMailList('inbox', value);
    });
  }




}
