import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewVLComponent } from './student-new-vl.component';

describe('StudentNewVLComponent', () => {
  let component: StudentNewVLComponent;
  let fixture: ComponentFixture<StudentNewVLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNewVLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewVLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
