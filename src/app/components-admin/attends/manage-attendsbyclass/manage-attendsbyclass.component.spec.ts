import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendsbyclassComponent } from './manage-attendsbyclass.component';

describe('ManageAttendsbyclassComponent', () => {
  let component: ManageAttendsbyclassComponent;
  let fixture: ComponentFixture<ManageAttendsbyclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAttendsbyclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAttendsbyclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
