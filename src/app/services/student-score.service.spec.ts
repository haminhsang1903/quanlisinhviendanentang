import { TestBed } from '@angular/core/testing';

import { StudentScoreService } from './student-score.service';

describe('StudentScoreService', () => {
  let service: StudentScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
