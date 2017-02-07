import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { VariablesModule } from './variables/variables.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DocumentsModule } from './documents/documents.module';
import { ConfigModule } from './config/config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule,
    GroupsModule,
    UsersModule,
    VariablesModule,
    HierarchyModule,
    ConfigModule,
    DocumentsModule
  ],
  providers: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
