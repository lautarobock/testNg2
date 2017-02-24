import { EventEmitter } from '@angular/core';
import { Values } from './values.model';

export class Value {

  public onChange = new EventEmitter();
  public state = {
    dirty: false,
    updated: false
  };

  constructor(private data: any, private _values: Values) {}

  set(data) {
    this.data = data;
    this.onChange.emit(data);
  }

  update(val) {
    if ( !this.data.values || this.data.values.length === 0 || this.data.values[0].value !== val) {
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
    if ( !this.data.values || this.data.values.length === 0 ) {
      return null;
    } else {
      return this.data.values[0].value;
    }
  }

  expression () {
    return this.data.expression;
  }

  updateExpression(expression) {
    this._values.changeExpression.emit({
      variableId: this.data.variableId,
      expression
    });
  }

  periodicExpression() {
    if ( this.data.lineItems.length !==0 ) {
      return this.data.lineItems[0].expression;
    } else {
      return null;
    }
  }

  comment(period) {
    if ( !this.data.values || this.data.values.length === 0 ) {
      return null;
    } else {
      let idx = 0;
      if ( period ) {
        idx = this.data.values.findIndex(value=>value.periodString === period);
      }
      return this.data.values[idx].comment;
    }
  }

  updateComment(comment, period?) {
    if ( !this.data.values || this.data.values.length === 0 || this.data.values[0].comment !== comment) {
      this._values.changeComment.emit({variableId: this.data.variableId, comment, period});
    }
  }
  
  dataType() {
    return this.data.dataType;
  }

  unit() {
    return this.data.unitLabel;
  }

  label(size) {
    return this.data[size+'CurrencyLabel'];
  }

  variableId() {
    return this.data.variableId;
  }
}
