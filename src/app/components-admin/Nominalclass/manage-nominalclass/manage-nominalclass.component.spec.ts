import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNominalclassComponent } from './manage-nominalclass.component';

describe('ManageNominalclassComponent', () => {
  let component: ManageNominalclassComponent;
  let fixture: ComponentFixture<ManageNominalclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNominalclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNominalclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
