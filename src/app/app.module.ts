import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DocumentsModule } from './documents/documents.module';
import { ConfigModule } from './config/config';
import { ToastyModule } from 'ng2-toasty';
import 'rxjs/Rx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    // AppRoutingModule,
    HierarchyModule,
    ConfigModule,
    DocumentsModule,
    ToastyModule.forRoot()
  ],
  providers: [
    // RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
