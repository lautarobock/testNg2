import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemDatedValueComponent } from './line-item-dated-value.component';

describe('LineItemDatedValueComponent', () => {
  let component: LineItemDatedValueComponent;
  let fixture: ComponentFixture<LineItemDatedValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemDatedValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemDatedValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
