import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluesComponent } from './evalues.component';

describe('EvaluesComponent', () => {
  let component: EvaluesComponent;
  let fixture: ComponentFixture<EvaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
