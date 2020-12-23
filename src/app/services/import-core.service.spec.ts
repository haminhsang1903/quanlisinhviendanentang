import { TestBed } from '@angular/core/testing';

import { ImportCoreService } from './import-core.service';

describe('ImportCoreService', () => {
  let service: ImportCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
