import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule
  ],
  declarations: [GroupListComponent]
})
export class GroupsModule { }
