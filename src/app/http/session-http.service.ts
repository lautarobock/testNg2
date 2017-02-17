import { EventEmitter, Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionEmitter {

  public onSessionExpires = new EventEmitter();

  expire(err) {
    this.onSessionExpires.emit(err);
  }

  onExpire() {
    return this.onSessionExpires;
  }
}


@Injectable()
export class SessionHttpService extends Http {

  constructor(
    protected _backend: ConnectionBackend,
    protected _defaultOptions: RequestOptions,
    private sessionEmitter: SessionEmitter
  ) {
    super(_backend, _defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // console.log('request...');
    return super.request(url, options).catch((err, caught)=> {
      if ( err.status === 401 ) {
        this.sessionEmitter.expire(err);
        throw new Error(err);
      } else {
        return caught;
      }
    });
  }

}

