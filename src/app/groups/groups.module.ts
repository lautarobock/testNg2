import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupService } from './group.service';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MaterialModule,
    UtilModule
  ],
  declarations: [GroupListComponent],
  providers: [
    GroupService
  ]
})
export class GroupsModule { }
