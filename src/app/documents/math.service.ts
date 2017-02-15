import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config/config';

@Injectable()
export class MathService {

  constructor(private http: Http, private config: Config) { }

  functions() {
    return this.http.get(this.config.get('apiPath') + '/variabledefinitions/mathfunctions').map(res => res.json());
  }
}
