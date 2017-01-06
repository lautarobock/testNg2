import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
// import { Ng2MaterialModule } from 'ng2-material';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { VariablesModule } from './variables/variables.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
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
    AppRoutingModule,
    GroupsModule,
    UsersModule,
    VariablesModule,
    HierarchyModule,
    ConfigModule
  ],
  providers: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
