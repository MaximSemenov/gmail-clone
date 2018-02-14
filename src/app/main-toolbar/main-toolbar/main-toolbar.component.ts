import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewContainerService } from '../../view-container/view-container.service';
import { ActivatedRoute, Router, RoutesRecognized, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolBarComponent implements OnInit {

  public mailBoxName: string;
  public searchControl = new FormControl('');

  constructor(private _router: Router, private _viewContainerService: ViewContainerService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._viewContainerService.getCurrentBoxName().subscribe((mailBoxName: string) => this.mailBoxName = mailBoxName);

    this.searchControl.valueChanges
      .subscribe((value: string) => this._viewContainerService
        .loadMailList(this.mailBoxName, value)
        .subscribe());
  }




}
