import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/config';

export class Document {
  
  public readonly:boolean = false;

  constructor(
    public documentId: number,
    public documentName: string,
    public templateVariables: any[],
    public variableDefinitions: any,
    public versionId: number,
    public hasExclusiveLock: boolean,
    public documentLock: any,
    public conceptDefinition: any,
    public revisions: any[]
  ) {}

}

export enum DataType {
  ScalarString,
  ScalarDateTime
}

export class Value {
  public state = {
    dirty: false,
    updated: false
  };

  constructor(private data: any, private _values: Values) {}

  set(data) {
    // this.data.values = data.values;
    this.data = data;
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
      return null
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
      return null
    } else {
      let idx = 0;
      if ( period ) {
        idx = this.data.values.findIndex(value=>value.periodString === period);
      }
      return this.data.values[idx].comment;
    }
  }

  updateComment(comment) {
    if ( !this.data.values || this.data.values.length === 0 || this.data.values[0].comment !== comment) {
      this._values.changeComment.emit({
        variableId: this.data.variableId,
        comment: comment
      });
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
        this._paramsMap.set(val.variableId,new Value(val,this))
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

@Injectable()
export class DocumentsService {

  constructor(private _http: Http, private _config: Config) { }

  get(documentId,versionId,revision = -1) {
    return this._http.get(this._config.get('apiPath') + `/documents/Data/${documentId}/${versionId}/${revision}`).map(res => res.json());
  }

  updateFields(document: Document, data, scenario, revision = -1, period?, lookup?, variableCurrency?) {
    if ( data.values.length > 1) {
      return this._http.post(
        this._config.get('apiPath') + `/documents/multipledata/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
        data.values.map(value=> {
          return {
            variableId: data.variableId,
            period: value.periodString,
            value: value.value,
            lookup: value.lookup
          }
        })
      ).map(res => res.json());
    } else {
      return this._http.post(
        this._config.get('apiPath') + `/documents/data/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
        { variableId: data.variableId, value: data.values[0].value, period, lookup, variableCurrency}
      ).map(res => res.json());
    }
  }

  updateComment(document: Document, scenario, variableId, comment, period?, revision = -1) {
    return this._http.post(
      this._config.get('apiPath') + `/documents/comment/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
      { variableId, comment, period }
    ).map(res => res.json());
  }

  updateExpression(document: Document, scenario, variableId, expression, revision = -1) {
    return this._http.post(
      this._config.get('apiPath') + `/documents/expression/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
      { variableId, expression }
    ).map(res => res.json());
  }
  
  variables(documentId, version, scenario, revision, variableNames) {
    let search = '';
    variableNames.forEach(variableId=>search += `variableId=${variableId}&`)
    return this._http.get(
      this._config.get('apiPath') + `/documents/variables/${documentId}/${version}/${revision}/${scenario}`,
      {
        search: search
      }
    ).map(res => res.json());
  }

  save(document: Document, comment, revisionTagIds) {
      return this._http.post(
        this._config.get('apiPath') + `/documents/save/${document.documentId}/${document.versionId}/-1`,
        { comment, revisionTagIds }
      );
  };

  release(document: Document) {
    return this._http.post(
      this._config.get('apiPath') + `/documents/UnlockDocument/${document.documentId}/${document.versionId}`,
      { 
        lockKey: document.documentLock.lockKey,
        isForceUnlock: true,
        requestLock: true
      }
    );
  }

  validateExpression(document: Document, scenarioName: string, variableId: number, expression: string) {
    return this._http.post(
      this._config.get('apiPath') + `/documents/validateexpression/${document.documentId}/${document.versionId}`,
      { variableId, expression, scenarioName }
    ).map(res => res.json());
  }
}
