import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListevalueComponent } from './manage-listevalue.component';

describe('ManageListevalueComponent', () => {
  let component: ManageListevalueComponent;
  let fixture: ComponentFixture<ManageListevalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageListevalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageListevalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
