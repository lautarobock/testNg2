import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdDataTable } from 'ng2-material/components/data-table';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserService } from './users/user.service';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupsModule } from './groups/groups.module';

@NgModule({
  declarations: [
    AppComponent,
    MdDataTable,
    UserListComponent,
    UserEditComponent
  ],
  entryComponents: [UserEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    GroupsModule
  ],
  providers: [
    UserService, 
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
