import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

export class Group {
  constructor(
    public workgroupName: string,
    public description: string,
    public comment: string
  ) {}
}

@Injectable()
export class GroupService {

  constructor(private http: Http) { }

  all() {
    return this.http.get('/api/workgroups').map(res => res.json());
  }

  get(id) {
    return this.http.get('/api/workgroups/' + id).map(res => res.json());
  }

}
