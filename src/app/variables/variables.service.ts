import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

export class Variable {

  constructor(
    private variableDataType: string,
    private name: string,
    private comments: string,
    private id: number,
    private prompt: string,
    private unitType: string,
    private categoryId: number,
    private subcategories: string [],
    private lookupList: string [],
    private requiresFullRecalculation: boolean
  ) {}
}

@Injectable()
export class VariablesService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/v1/variabledefinitions').map(res => res.json());
  }

  get(id) {
    return this.http.get('/api/v1/variabledefinitions/' + id).map(res => res.json());
  }

}
