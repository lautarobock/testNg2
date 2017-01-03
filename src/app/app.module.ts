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

@NgModule({
  declarations: [
    AppComponent,
    // MdDataTable
  ],
  // entryComponents: [UserEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    // Ng2MaterialModule.forRoot(),
    AppRoutingModule,
    GroupsModule,
    UsersModule
  ],
  // exports: [MdDataTable],
  providers: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
