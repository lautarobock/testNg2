import { lookup } from 'dns';
import { EventEmitter } from '@angular/core';
import { Values } from './values.model';

export class Value {

  public onChange = new EventEmitter();
  public state = {
    dirty: false,
    updated: false,

  };

  constructor(private data: any, private _values: Values) { }

  set(data, flash: boolean = false) {
    this.data = data;
    this.onChange.emit(data);
    if (flash) {
      this.state.updated = true;
      setTimeout(() => this.state.updated = false, 1000);
    }
  }

  update(val) {
    if (!this.data.values || this.data.values.length === 0 || this.data.values[0].value !== val) {
      this.state.dirty = true;
      this._values.changeVariable.emit({
        variableId: this.data.variableId,
        values: [{
          value: val
        }]
      });
    }
  }

  clear() {
    this.state.dirty = true;
    this._values.changeVariable.emit({
      variableId: this.data.variableId,
      values: []
    });
  }

  updateAll(values) {
    this.state.dirty = true;
    this._values.changeVariable.emit({
      variableId: this.data.variableId,
      values: values
    });
  }

  values() {
    return this.data.values;
  }

  safe() {
    if (!this.data.values || this.data.values.length === 0) {
      return null;
    } else {
      return this.data.values[0].value;
    }
  }

  expression() {
    return this.data.expression;
  }

  updateExpression(expression) {
    this._values.changeExpression.emit({
      variableId: this.data.variableId,
      expression
    });
  }

  periodicExpression() {
    if (this.data.lineItems.length !== 0) {
      return this.data.lineItems[0].expression;
    } else {
      return null;
    }
  }

  scalarExpression() {
    return this.data.expression;
  }

  comment(index = 0) {
    if (!this.data.values || this.data.values.length === 0) {
      return null;
    } else {
      return this.data.values[index].comment;
    }
  }

  updateComment(comment, index = 0) {
    let value = this.values()[index];
    this._values.changeComment.emit({
      variableId: this.data.variableId,
      comment,
      period: value.periodString,
      lookup: value.lookup
    });
  }

  dataType() {
    return this.data.dataType;
  }

  unit() {
    return this.data.unitLabel;
  }

  label(size) {
    return this.data[size + 'CurrencyLabel'];
  }

  variableId() {
    return this.data.variableId;
  }
}
