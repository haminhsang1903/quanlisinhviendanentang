import { TestBed } from '@angular/core/testing';

import { ManageResultService } from './manage-result.service';

describe('ManageResultService', () => {
  let service: ManageResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
