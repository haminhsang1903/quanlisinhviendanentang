import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendsComponent } from './student-attends.component';

describe('StudentAttendsComponent', () => {
  let component: StudentAttendsComponent;
  let fixture: ComponentFixture<StudentAttendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
