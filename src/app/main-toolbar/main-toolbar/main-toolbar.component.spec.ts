import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolBarComponent } from './main-tool-bar.component';

describe('MainToolBarComponent', () => {
  let component: MainToolBarComponent;
  let fixture: ComponentFixture<MainToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
