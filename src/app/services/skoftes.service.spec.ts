import { TestBed } from '@angular/core/testing';

import { SkoftesService } from './skoftes.service';

describe('SkoftesService', () => {
  let service: SkoftesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkoftesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
