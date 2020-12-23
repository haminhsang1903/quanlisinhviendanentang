import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBestByYearComponent } from './student-best-by-year.component';

describe('StudentBestByYearComponent', () => {
  let component: StudentBestByYearComponent;
  let fixture: ComponentFixture<StudentBestByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBestByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBestByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
