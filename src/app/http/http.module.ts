import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionHttpService, SessionEmitter } from './session-http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SessionHttpService, SessionEmitter],
  exports: [],
  declarations: []
})
export class CustomHttpModule { }
