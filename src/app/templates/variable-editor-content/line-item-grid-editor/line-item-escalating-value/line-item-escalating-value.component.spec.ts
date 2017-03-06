import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemEscalatingValueComponent } from './line-item-escalating-value.component';

describe('LineItemEscalatingValueComponent', () => {
  let component: LineItemEscalatingValueComponent;
  let fixture: ComponentFixture<LineItemEscalatingValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemEscalatingValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemEscalatingValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
