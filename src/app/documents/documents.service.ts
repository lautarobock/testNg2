import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/config';
import { Document, LineItemType } from './documents.model';

@Injectable()
export class DocumentsService {

  apiPath: string;

  constructor(private _http: Http, private _config: Config) {
    this.apiPath = this._config.get('apiPath');
  }

  get(documentId,versionId,revision = -1) {
    return this._http.get(`${this.apiPath}/documents/Data/${documentId}/${versionId}/${revision}`).map(res => res.json());
  }

  status(document: Document, scenario, revision = -1) {
    return this._http.get(`${this.apiPath}/documents/status/${document.documentId}/${document.versionId}/${revision}/${scenario}`).map(res => res.json());
  }

  updateVariables(document: Document, datas: Array<any>, scenario, revision = -1) {
    var requestValues = [];
    datas.forEach(data => {
      data.values.forEach(value => {
        requestValues.push({
          variableId: data.variableId,
          period: value.periodString,
          value: value.value
        })
      });
    });
    return this._http.post(`${this.apiPath}/documents/multipledata/${document.documentId}/${document.versionId}/${revision}/${scenario}`, requestValues)
      .map(res => res.json());
  }

  updateFields(document: Document, data, scenario, revision = -1, period?, lookup?, variableCurrency?) {
    if ( data.values.length > 1) {
      return this._http.post(
        `${this.apiPath}/documents/multipledata/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
        data.values.map(value=> {
          return {
            variableId: data.variableId,
            period: value.periodString,
            value: value.value,
            lookup: value.lookup
          };
        })
      ).map(res => res.json());
    } else {
      return this._http.post(
        `${this.apiPath}/documents/data/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
        { variableId: data.variableId, value: data.values[0].value, period, lookup, variableCurrency}
      ).map(res => res.json());
    }
  }

  updateLineItem(document: Document, scenario, variableId, lineItems, revision = -1) {
    return this._http.post(
      `${this.apiPath}/documents/data/${document.documentId}/${document.versionId}/${revision}/${scenario}`, { 
        variableId,
        lineItems: lineItems.map(item => {
            item.values = item.containedValues;
            return item;
        })
      }
    ).map(res => res.json());
  }

  updateComment(document: Document, scenario, variableId, comment, period?, lookup?, revision = -1) {
    return this._http.post(
      `${this.apiPath}/documents/comment/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
      { variableId, comment, period, lookup }
    ).map(res => res.json());
  }

  updateExpression(document: Document, scenario, variableId, expression, revision = -1) {
    return this._http.post(
      `${this.apiPath}/documents/expression/${document.documentId}/${document.versionId}/${revision}/${scenario}`,
      { variableId, expression }
    ).map(res => res.json());
  }
  
  variables(documentId, version, scenario, revision, variableNames) {
    let search = '';
    variableNames.forEach(variableId=>search += `variableId=${variableId}&`);
    return this._http.get(
      `${this.apiPath}/documents/variables/${documentId}/${version}/${revision}/${scenario}`,
      {
        search: search
      }
    ).map(res => res.json());
  }

  save(document: Document, comment, revisionTagIds) {
      return this._http.post(
        `${this.apiPath}/documents/save/${document.documentId}/${document.versionId}/-1`,
        { comment, revisionTagIds }
      );
  };

  release(document: Document) {
    return this._http.post(
      `${this.apiPath}/documents/UnlockDocument/${document.documentId}/${document.versionId}`,
      { 
        lockKey: document.documentLock.lockKey,
        isForceUnlock: true,
        requestLock: true
      }
    );
  }

  validateExpression(document: Document, scenarioName: string, variableId: number, expression: string) {
    return this._http.post(
      `${this.apiPath}/documents/validateexpression/${document.documentId}/${document.versionId}`,
      { variableId, expression, scenarioName }
    ).map(res => res.json());
  }
}

@Injectable()
export class LineItemTypeText {

  public names: Array<string> = [
    'Dated Value',
    'Escalating Value',
    'Expression',
    'Periodic Values'
  ];

  // public get(key: LineItemType) {
  //   return this.names[LineItemType[key]];
  // }

}
