import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSkoftesComponent } from './manage-skoftes.component';

describe('ManageSkoftesComponent', () => {
  let component: ManageSkoftesComponent;
  let fixture: ComponentFixture<ManageSkoftesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSkoftesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSkoftesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
