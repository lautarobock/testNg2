import { DecimalPipe } from '@angular/common/src/pipes/number_pipe';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeSeriesGridEditorComponent, RowSerializer, ValueFormatter, RowParser } from './time-series-grid-editor.component';

xdescribe('TimeSeriesGridEditorComponent', () => {
  let component: TimeSeriesGridEditorComponent;
  let fixture: ComponentFixture<TimeSeriesGridEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesGridEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesGridEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('RowSerializer', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe]
    })
    .compileComponents();
  }));

  it('Should serialize row', inject([DecimalPipe],(decimalPipe:DecimalPipe) => {
    let unit ={
      factor: 1, display: 'Unit name'
    };
    let rs = new RowSerializer(
      'Variable Name',
      'Category name',
      [{
        value:1
      },{
        value:2
      }],{
        factor: 1, display: 'Unit name'
      },
      new ValueFormatter(
        unit,
        0,
        '1.2-2',
        decimalPipe
      )
    ).toString();
    expect(rs).toBe('Variable Name\tCategory name\tUnit name\t1.00\t2.00');
  }))
});

describe('RowParser', () => {
  /**
   * it should parse row in text as is copied from grid. 
   * Name [tab] Category [Tab] [Unit name] [Tab] Values....
   */
  it('Should parse row as copied from grid', () => {
    let unit ={
      factor: 1, display: 'Unit name'
    };
    let row = 'Variable Name\tCategory name\tUnit name\t1.00\t2.00';
    let value = new RowParser(row,[unit]).values();
    expect(value).toEqual({
      variablePrompt: 'Variable Name',
      categoryName: 'Category name',
      unit,
      values: [1,2]
    });
  })
});
