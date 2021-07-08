import { TestBed } from '@angular/core/testing';

import { SearchClientService } from './search-client.service';

describe('SearchClientService', () => {
  let service: SearchClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
