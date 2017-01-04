import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupEditComponent } from './group-edit/group-edit.component';

const appRoutes: Routes = [{
    path: 'groups',
    component: GroupListComponent
},{
    path: 'groups/:id',
    component: GroupEditComponent
}];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule {}