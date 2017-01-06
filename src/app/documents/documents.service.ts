import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/config';

@Injectable()
export class DocumentsService {

  constructor(private _http: Http, private _config: Config) { }

  get(documentId) {
    return this._http.get(this._config.get('apiPath') + `/documents/Data/${documentId}/1/-1`).map(res => res.json());
  }
}
