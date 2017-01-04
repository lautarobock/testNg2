import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupService } from './group.service';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GroupsRoutingModule,
    MaterialModule,
    UtilModule
  ],
  declarations: [GroupListComponent, GroupEditComponent],
  providers: [
    GroupService
  ]
})
export class GroupsModule { }
