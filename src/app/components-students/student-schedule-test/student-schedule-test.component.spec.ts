import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScheduleTestComponent } from './student-schedule-test.component';

describe('StudentScheduleTestComponent', () => {
  let component: StudentScheduleTestComponent;
  let fixture: ComponentFixture<StudentScheduleTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentScheduleTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentScheduleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
