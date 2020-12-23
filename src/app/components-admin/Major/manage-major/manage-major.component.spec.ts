import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMajorComponent } from './manage-major.component';

describe('ManageMajorComponent', () => {
  let component: ManageMajorComponent;
  let fixture: ComponentFixture<ManageMajorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMajorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
