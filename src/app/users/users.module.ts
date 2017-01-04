import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserService } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MaterialModule,
    UtilModule
  ],
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
  exports: [
    UserListComponent,
    UserEditComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
