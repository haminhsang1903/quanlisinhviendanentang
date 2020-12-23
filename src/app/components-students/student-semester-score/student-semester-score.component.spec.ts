import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSemesterScoreComponent } from './student-semester-score.component';

describe('StudentSemesterScoreComponent', () => {
  let component: StudentSemesterScoreComponent;
  let fixture: ComponentFixture<StudentSemesterScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSemesterScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSemesterScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
