import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageImportscoreComponent } from './manage-importscore.component';

describe('ManageImportscoreComponent', () => {
  let component: ManageImportscoreComponent;
  let fixture: ComponentFixture<ManageImportscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageImportscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageImportscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
