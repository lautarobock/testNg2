import { Injectable, EventEmitter } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, Request, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginDialog } from '../login/login-dialog/login-dialog.component';

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

  // public onSessionExpires = new EventEmitter();

  constructor(
    protected _backend: ConnectionBackend,
    protected _defaultOptions: RequestOptions,
    private sessionEmitter: SessionEmitter
  ) {
    super(_backend, _defaultOptions)
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('request...');
    return super.request(url, options).catch((err, caught)=> {
      if ( err.status === 401 ) {
        this.sessionEmitter.expire(err);
        //FIXME, disacouple this class
        // this.loginDialog.open().then(() => location.reload()).catch((err)=>console.log(err));
        throw new Error(err);
      } else {
        return caught;
      }
    });
  }

}

