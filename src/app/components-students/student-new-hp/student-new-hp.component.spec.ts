import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewHPComponent } from './student-new-hp.component';

describe('StudentNewHPComponent', () => {
  let component: StudentNewHPComponent;
  let fixture: ComponentFixture<StudentNewHPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNewHPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewHPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
