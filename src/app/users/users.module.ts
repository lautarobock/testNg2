import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserService } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';
// import { Ng2MaterialModule } from 'ng2-material';
// import { MdDataTable } from 'ng2-material/components/data-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MaterialModule,
    UtilModule
  ],
  // entryComponents: [UserEditComponent],
  declarations: [
    UserListComponent,
    UserEditComponent,
    // MdDataTable
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
