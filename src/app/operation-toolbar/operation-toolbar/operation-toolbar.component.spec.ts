import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationToolbarComponent } from './operation-toolbar.component';

describe('OperationToolbarComponent', () => {
  let component: OperationToolbarComponent;
  let fixture: ComponentFixture<OperationToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
