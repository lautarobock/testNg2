/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UniformGridContentComponent } from './uniform-grid-content.component';

describe('UniformGridContentComponent', () => {
  let component: UniformGridContentComponent;
  let fixture: ComponentFixture<UniformGridContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniformGridContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformGridContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
