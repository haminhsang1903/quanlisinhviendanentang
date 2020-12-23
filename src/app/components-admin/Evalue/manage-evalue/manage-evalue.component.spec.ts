import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEvalueComponent } from './manage-evalue.component';

describe('ManageEvalueComponent', () => {
  let component: ManageEvalueComponent;
  let fixture: ComponentFixture<ManageEvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
