import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Config } from '../config/config';

@Injectable()
export class HierarchyService {

  constructor(private _http: Http, private _config: Config) { }

  versions() {
    return this._http.get(this._config.get('apiPath') + '/versions').map(res => res.json());
  }

  documents(versionId) {
    return this._http.get(this._config.get('apiPath') + '/hierarchy/tree/' + versionId).map(res => res.json());
  }
}
