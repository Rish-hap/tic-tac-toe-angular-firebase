import { TestBed } from '@angular/core/testing';

import { TossService } from './toss.service';

describe('TossService', () => {
  let service: TossService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TossService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
