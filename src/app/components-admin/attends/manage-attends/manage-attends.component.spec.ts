import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendsComponent } from './manage-attends.component';

describe('ManageAttendsComponent', () => {
  let component: ManageAttendsComponent;
  let fixture: ComponentFixture<ManageAttendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAttendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAttendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
