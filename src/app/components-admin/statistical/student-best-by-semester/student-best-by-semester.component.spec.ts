import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBestBySemesterComponent } from './student-best-by-semester.component';

describe('StudentBestBySemesterComponent', () => {
  let component: StudentBestBySemesterComponent;
  let fixture: ComponentFixture<StudentBestBySemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBestBySemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBestBySemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
