import { TestBed } from '@angular/core/testing';

import { AvatarsDBService } from './avatars-db.service';

describe('AvatarsDBService', () => {
  let service: AvatarsDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarsDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
