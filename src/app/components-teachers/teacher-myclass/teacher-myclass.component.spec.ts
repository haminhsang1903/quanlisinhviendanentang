import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMyclassComponent } from './teacher-myclass.component';

describe('TeacherMyclassComponent', () => {
  let component: TeacherMyclassComponent;
  let fixture: ComponentFixture<TeacherMyclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMyclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMyclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
