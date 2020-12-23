import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendsComponent } from './teacher-attends.component';

describe('TeacherAttendsComponent', () => {
  let component: TeacherAttendsComponent;
  let fixture: ComponentFixture<TeacherAttendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAttendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
