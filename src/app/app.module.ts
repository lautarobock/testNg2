import 'rxjs/Rx';
import { AppComponent } from './app.component';
import { ConfigModule } from './config/config';
import { DocumentsModule } from './documents/documents.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { CustomHttpModule } from './http/http.module';
import { SessionEmitter, SessionHttpService } from './http/session-http.service';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastyModule } from 'ng2-toasty';

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