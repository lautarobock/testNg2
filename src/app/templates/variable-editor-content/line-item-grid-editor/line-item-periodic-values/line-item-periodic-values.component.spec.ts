import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemPeriodicValuesComponent } from './line-item-periodic-values.component';

describe('LineItemPeriodicValuesComponent', () => {
  let component: LineItemPeriodicValuesComponent;
  let fixture: ComponentFixture<LineItemPeriodicValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemPeriodicValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemPeriodicValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
