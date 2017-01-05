/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VariableEditComponent } from './variable-edit.component';

describe('VariableEditComponent', () => {
  let component: VariableEditComponent;
  let fixture: ComponentFixture<VariableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
