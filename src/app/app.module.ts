import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DocumentsModule } from './documents/documents.module';
import { ConfigModule } from './config/config';
import { CustomHttpModule } from './http/http.module';
import { LoginModule } from './login/login.module';
import { LoginDialog } from './login/login-dialog/login-dialog.component';
import { SessionHttpService, SessionEmitter } from './http/session-http.service';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import 'rxjs/Rx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoginModule,
    CustomHttpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    HierarchyModule,
    ConfigModule,
    DocumentsModule,
    ToastyModule.forRoot(),
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    {
      provide : Http, 
      useFactory: factory,
      deps:  [XHRBackend, RequestOptions, SessionEmitter]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function factory(xhrBackend: XHRBackend, requestOptions:  RequestOptions, sessionEmitter:SessionEmitter) {
  return new SessionHttpService(xhrBackend, requestOptions, sessionEmitter);
}