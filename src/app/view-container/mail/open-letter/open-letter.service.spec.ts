import { TestBed, inject } from '@angular/core/testing';

import { OpenLetterService } from './open-letter.service';

describe('OpenLetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenLetterService]
    });
  });

  it('should be created', inject([OpenLetterService], (service: OpenLetterService) => {
    expect(service).toBeTruthy();
  }));
});
