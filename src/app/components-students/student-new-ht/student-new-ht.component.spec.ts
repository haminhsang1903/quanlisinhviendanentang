import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewHTComponent } from './student-new-ht.component';

describe('StudentNewHTComponent', () => {
  let component: StudentNewHTComponent;
  let fixture: ComponentFixture<StudentNewHTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNewHTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewHTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
