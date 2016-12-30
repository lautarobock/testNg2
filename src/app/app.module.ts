import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdDataTable } from 'ng2-material/components/data-table';

import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user-service.service';
import { UserEditComponent,UserEditDialog } from './user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MdDataTable,
    UserListComponent,
    UserEditComponent,
  ],
  entryComponents: [UserEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [UserService, UserEditDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
