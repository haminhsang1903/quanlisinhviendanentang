import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentByYearComponent } from './student-by-year.component';

describe('StudentByYearComponent', () => {
  let component: StudentByYearComponent;
  let fixture: ComponentFixture<StudentByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
