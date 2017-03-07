import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemExpressionComponent } from './line-item-expression.component';

describe('LineItemExpressionComponent', () => {
  let component: LineItemExpressionComponent;
  let fixture: ComponentFixture<LineItemExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemExpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
