import { CurrencyReader, Unit, UnitReader } from '../../../documents/unit-reader';
import { Value } from '../../../documents/value.model';
import { AbstractEditorComponent } from '../../abstract-content';
import { DecimalPipe } from '@angular/common/src/pipes/number_pipe';
import { OnInit } from '@angular/core';
import { document } from '@angular/platform-browser/src/facade/browser';
import { ToastyService } from 'ng2-toasty';
import { clearTimeout, setTimeout } from 'timers';

export abstract class AbstractGridEditorComponent extends AbstractEditorComponent implements OnInit {

  decimalPlaces = 2;
  numberFormat = '1.2-2';
  displayZeroValuesAs = 0;
  groupName: string;
  rowContexts: RowContext[];
  text2CopyAll: string;
  editionIdx = null;
  tmpValues = [];
  selectedCP = {};
  formatter: ValueFormatter;
  cachedColumns: string[];
  maxCols = 10;

  constructor(protected decimalPipe: DecimalPipe, protected toastyService: ToastyService) {
    super();
  }

  ngOnInit() {
    this.decimalPlaces = this.parent.jsonProperties().DecimalPlaces || 2;
    this.numberFormat = `1.${this.decimalPlaces}-${this.decimalPlaces}`;
    this.displayZeroValuesAs = this.parent.jsonProperties().DisplayZeroValuesAs || 0;
    this.groupName = this.parent.jsonProperties().GroupName;
    this.rowContexts = this.editor.variableIds.map((variableId, idx) => new RowContext(
      this.value(variableId),
      this.document.variableDefinitions,
      this.displayZeroValuesAs,
      this.numberFormat,
      this.decimalPipe
    ));
    this.cachedColumns = this.columns();
    this.updateText2CopyAll();
    this.editor.variableIds.forEach((variableId, idx) => this.value(variableId).onChange.subscribe(data => this.updateText2Copy(variableId, idx)));
    this.formatter = new ValueFormatter(
      this.displayZeroValuesAs,
      this.numberFormat,
      this.decimalPipe
    );
  }

  abstract isReadOnly(idx): boolean;
  abstract columns(): string[];

  updateText2Copy(variableId, idx) {
    this.rowContexts[idx].updateText2Copy();
    this.updateText2CopyAll();
  }

  updateText2CopyAll() {
    this.text2CopyAll = 'Category\tVariable\tUnit\t';
    this.text2CopyAll += this.cachedColumns.join('\t');
    this.text2CopyAll += '\n';
    this.text2CopyAll += this.rowContexts.map(rc => rc.text2Copy).join('\n');
  }

  computedValue(value, unit) {
    return this.formatter.format(value, unit);
  }

  onScroll() {
    this.maxCols = this.cachedColumns.length;
  }

  edit(idx, periodIdx) {
    if (this.isReadOnly(idx) || this.editionIdx !== null) return;
    this.editionIdx = idx;
    this.tmpValues = JSON.parse(JSON.stringify(this.value(this.editor.variableIds[idx]).values()));
    this.tmpValues.forEach(value => value.value = value.value * this.rowContexts[idx].selectedUnit.factor);
    this.onScroll();
    setTimeout(() => document.getElementById(`input-grid-${periodIdx}`).focus(), 50);
  }

  cancelEdit() {
    this.editionIdx = null;
    setTimeout(() => this.tmpValues = [], 50);
  }

  blur($event) {
    //if two ids start with prefix 'input-grid-' is like do not lost focus of row in edition
    if ( this.editionIdx !== null && !($event.srcElement.id && $event.relatedTarget   && $event.relatedTarget.id && $event.srcElement.id.startsWith('input-grid-') && $event.relatedTarget.id.startsWith('input-grid-')) ) {
      this.tmpValues.forEach(value => value.value = value.value / this.rowContexts[this.editionIdx].selectedUnit.factor);
      this.value(this.editor.variableIds[this.editionIdx]).updateAll(this.tmpValues);
      this.tmpValues = [];
      this.editionIdx = null;
    }
  }

  onPasteRow(text: string, variableId: number, idx: number) {
    try {
      let pastedValues = new RowParser(text, this.rowContexts[idx].units).values();
      if (pastedValues.variablePrompt !== this.document.variableDefinitions[variableId].prompt) {
        this.toastyService.error('Variable name do not match');
        return;
      }
      if (pastedValues.categoryName !== this.document.variableDefinitions[variableId].category.name) {
        this.toastyService.error('Category name do not match');
        return;
      }
      this.rowContexts[idx].selectedUnit = pastedValues.unit;
      this.value(variableId).updateAll(this.value(variableId).values().map((v, idx) => {
        v.value = pastedValues.values[idx];
        return v;
      }));
    } catch (err) {
      this.toastyService.error(err.message);
    }
  }

  onPasteAll(text: string) {
    this.data.updateMultiple(
      text.split('\n')
        .filter(row => row.trim().length !== 0)
        .map((row, idx) => new RowParser(row, this.rowContexts[idx].units).values())
        .map((row, idx) => {
          this.rowContexts[idx].selectedUnit = row.unit;
          let variableId = this.editor.variableIds[idx];
          return {
            variableId,
            values: this.value(variableId).values().map((v, idx) => {
              v.value = row.values[idx];
              return v;
            })
          }
        })
    );
  }
}



export class RowContext {
  units: Unit[];
  selectedUnit: Unit;
  text2Copy: string;

  constructor(private value: Value, private variableDefinitions: any, private displayZeroValuesAs, private numberFormat, private decimalPipe: DecimalPipe) {
    if (variableDefinitions[value.variableId()].unit.isCurrency) {
      this.units = new CurrencyReader(variableDefinitions[value.variableId()].unit, value).unique();
    } else {
      this.units = new UnitReader(variableDefinitions[value.variableId()].unit).unique();
    }
    this.selectedUnit = this.units.find(u => u.display === value.unit());
    this.updateText2Copy();
  }

  updateText2Copy() {
    this.text2Copy = new RowSerializer(
      this.variableDefinitions[this.value.variableId()].prompt,
      this.variableDefinitions[this.value.variableId()].category.name,
      this.value.values(),
      this.selectedUnit,
      new ValueFormatter(
        this.displayZeroValuesAs,
        this.numberFormat,
        this.decimalPipe
      )
    ).toString()
  }

}

export class ValueFormatter {
  constructor(
    private displayZeroValuesAs: number,
    private numberFormat: string,
    private decimalPipe: DecimalPipe
  ) { }

  format(value: number, unit: Unit) {
    return this.decimalPipe.transform(this.computedValue(value, unit), this.numberFormat);
  }

  computedValue(value, unit: Unit) {
    if (value) {
      return value * unit.factor;
    } else {
      return this.displayZeroValuesAs;
    }
  }
}

export class RowSerializer {

  constructor(
    private prompt: string,
    private category: string,
    private values: Array<any>,
    private unit: any,
    private formatter: ValueFormatter
  ) { }

  toString() {
    return `${this.prompt}\t${this.category}\t${this.unit.display}\t`
      + this.values.map(periodValue => {
        return this.formatter.format(periodValue.value, this.unit);
      }).join('\t');
  }

}

export class RowParser {

  constructor(private rowText: string, private units: Array<Unit>) { }

  values() {
    let fields = this.rowText.split('\t');
    let unit = this.units.find(u => u.display === fields[2]);
    if (!unit) {
      throw new Error('Unit do not match with any of the list');
    }
    return {
      variablePrompt: fields[0],
      categoryName: fields[1],
      unit,
      values: fields.slice(3).map(v => parseFloat(v) / unit.factor)
    };
  }
}