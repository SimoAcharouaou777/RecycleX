import { TestBed } from '@angular/core/testing';

import { CollectionRequestService } from './collection-request.service';

describe('CollectionRequestService', () => {
  let service: CollectionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
