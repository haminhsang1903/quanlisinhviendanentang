import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashbroadComponent } from './teacher-dashbroad.component';

describe('TeacherDashbroadComponent', () => {
  let component: TeacherDashbroadComponent;
  let fixture: ComponentFixture<TeacherDashbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDashbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDashbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
