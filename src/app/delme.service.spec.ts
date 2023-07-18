import { TestBed } from '@angular/core/testing';

import { DelmeService } from './delme.service';

describe('DelmeService', () => {
  let service: DelmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
