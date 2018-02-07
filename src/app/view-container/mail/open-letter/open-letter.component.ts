import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import { OpenLetterService } from './open-letter.service';

@Component({
  selector: 'app-open-letter',
  templateUrl: './open-letter.component.html',
  styleUrls: ['./open-letter.component.css']
})
export class OpenLetterComponent implements OnInit {

  public text: string;

  constructor(private _openLetterService: OpenLetterService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // this._activatedRoute.params.subscribe(a => console.log(a));
    this._activatedRoute.params
      .pluck('id')
      .do((id: string) => this._openLetterService.getText(id))
      .subscribe((text: string) => console.log(text));
// TODO subscribe needs rework tomorrow 

  }

}
