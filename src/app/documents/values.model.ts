import { EventEmitter } from '@angular/core';
import { Value } from './value.model';

export class Values {
  
  public changeVariable = new EventEmitter();
  public changeComment = new EventEmitter();
  public changeExpression = new EventEmitter();

  private _paramsMap: Map<number, Value> = new Map<number, Value>();

  constructor(values: any[]) {
    values.forEach(val=>this._paramsMap.set(val.variableId,new Value(val,this)));
  }

  update(values) {
    values.forEach(val=>{
      if ( this._paramsMap.has(val.variableId) ) {
        this._paramsMap.get(val.variableId).set(val);
      } else {
        this._paramsMap.set(val.variableId,new Value(val,this));
      }
    });
  }

  get(variableId) : Value {
    return this._paramsMap.get(variableId);
  }

  clear() {
    this._paramsMap.clear();
  }
  
  clearDirties() {
    this._paramsMap.forEach(v=>v.state.dirty = false);
  }
}   