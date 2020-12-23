import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentByMajorComponent } from './student-by-major.component';

describe('StudentByMajorComponent', () => {
  let component: StudentByMajorComponent;
  let fixture: ComponentFixture<StudentByMajorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentByMajorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentByMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
