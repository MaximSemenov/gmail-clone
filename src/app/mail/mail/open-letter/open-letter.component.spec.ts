import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLetterComponent } from './open-letter.component';

describe('OpenLetterComponent', () => {
  let component: OpenLetterComponent;
  let fixture: ComponentFixture<OpenLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
