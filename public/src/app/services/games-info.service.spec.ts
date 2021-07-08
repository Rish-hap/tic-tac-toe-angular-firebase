import { TestBed } from '@angular/core/testing';

import { GamesInfoService } from './games-info.service';

describe('GamesInfoService', () => {
  let service: GamesInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
