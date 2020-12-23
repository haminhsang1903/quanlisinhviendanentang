import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalclassAddstudentComponent } from './nominalclass-addstudent.component';

describe('NominalclassAddstudentComponent', () => {
  let component: NominalclassAddstudentComponent;
  let fixture: ComponentFixture<NominalclassAddstudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalclassAddstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalclassAddstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
