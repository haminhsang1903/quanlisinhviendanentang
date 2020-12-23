import { TestBed } from '@angular/core/testing';

import { NominalClassService } from './nominal-class.service';

describe('NominalClassService', () => {
  let service: NominalClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominalClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
