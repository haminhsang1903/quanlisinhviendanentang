import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoomdatenowComponent } from './manage-roomdatenow.component';

describe('ManageRoomdatenowComponent', () => {
  let component: ManageRoomdatenowComponent;
  let fixture: ComponentFixture<ManageRoomdatenowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRoomdatenowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoomdatenowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
