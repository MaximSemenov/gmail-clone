import { TestBed, inject } from '@angular/core/testing';

import { ViewContainerService } from './view-container.service';

describe('ViewContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewContainerService]
    });
  });

  it('should be created', inject([ViewContainerService], (service: ViewContainerService) => {
    expect(service).toBeTruthy();
  }));
});
