import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResultbyclassComponent } from './manage-resultbyclass.component';

describe('ManageResultbyclassComponent', () => {
  let component: ManageResultbyclassComponent;
  let fixture: ComponentFixture<ManageResultbyclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageResultbyclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageResultbyclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
