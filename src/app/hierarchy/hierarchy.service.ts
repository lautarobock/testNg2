import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Config } from '../config/config';

@Injectable()
export class HierarchyService {

  apiPath: string;

  constructor(private http: Http, config: Config) {
    this.apiPath = config.get('apiPath');
  }

  versions() {
    return this.http.get(`${this.apiPath}/versions`).map(res => res.json());
  }

  documents(versionId) {
    return this.http.get(`${this.apiPath}/hierarchy/tree/${versionId}`).map(res => res.json());
  }

  tags(type: TagType) {
    return this.http.get(`${this.apiPath}/hierarchy/tags?type=${TagType[type]}`).map(res => res.json());
  }
}

export enum TagType{
  Revision,
  Layer
}