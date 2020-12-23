import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBestByMajorComponent } from './student-best-by-major.component';

describe('StudentBestByMajorComponent', () => {
  let component: StudentBestByMajorComponent;
  let fixture: ComponentFixture<StudentBestByMajorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBestByMajorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBestByMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
