import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/config';

export class Document {
  constructor(
    public documentId: number,
    public documentName: string,
    public templateVariables: any[],
    public variableDefinitions: any,
    public versionId: number
  ) {}
}

export enum DataType {
  ScalarString
}

export class Value {

  constructor(private data: any, private _values: Values) {}

  safeValue(val) {
    if (arguments.length !== 0) {
      if ( !this.data.values || this.data.values.length === 0 ) {
        this.data.values = [{ }]
      }
      if ( this.data.values[0].value !== val) {
        this.data.values[0].value = val;
        this._values.changeVariable.emit(this.data);
      }
    }
    if ( !this.data.values || this.data.values.length === 0 ) {
      return null
    } else {
      return this.data.values[0].value
    }
  }
}

export class Values {
  
  public changeVariable = new EventEmitter();

  private _paramsMap: Map<number, Value> = new Map<number, Value>();

  constructor(values: any[]) {
    values.forEach(val=>this._paramsMap.set(val.variableId,new Value(val,this)));
  }

  get(variableId) {
    return this._paramsMap.get(variableId);
  }

  clear() {
    this._paramsMap.clear();
  }
}

@Injectable()
export class DocumentsService {

  constructor(private _http: Http, private _config: Config) { }

  get(documentId) {
    return this._http.get(this._config.get('apiPath') + `/documents/Data/${documentId}/1/-1`).map(res => res.json());
  }

  updateFields(document: Document, data, scenario, revision = -1, period?, lookup?, variableCurrency?) {
    //documentId, version, scenario, revision, variableId, value, period, lookup, variableCurrency
    return this._http.post(
      this._config.get('apiPath') + `/documents/data/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
      { variableId: data.variableId, value: data.values[0].value, period: period, lookup, variableCurrency}
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
}
