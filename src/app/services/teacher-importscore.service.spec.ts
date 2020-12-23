import { TestBed } from '@angular/core/testing';

import { TeacherImportscoreService } from './teacher-importscore.service';

describe('TeacherImportscoreService', () => {
  let service: TeacherImportscoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherImportscoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
