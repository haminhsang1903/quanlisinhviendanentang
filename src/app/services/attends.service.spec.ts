import { TestBed } from '@angular/core/testing';

import { AttendsService } from './attends.service';

describe('AttendsService', () => {
  let service: AttendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
