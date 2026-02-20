import { TestBed } from '@angular/core/testing';

import { AccOpeationService } from './acc-opeation-service';

describe('AccOpeationService', () => {
  let service: AccOpeationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccOpeationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
