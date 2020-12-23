import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResultComponent } from './manage-result.component';

describe('ManageResultComponent', () => {
  let component: ManageResultComponent;
  let fixture: ComponentFixture<ManageResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
