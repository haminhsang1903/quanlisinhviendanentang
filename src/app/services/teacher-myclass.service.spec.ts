import { TestBed } from '@angular/core/testing';

import { TeacherMyclassService } from './teacher-myclass.service';

describe('TeacherMyclassService', () => {
  let service: TeacherMyclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherMyclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
