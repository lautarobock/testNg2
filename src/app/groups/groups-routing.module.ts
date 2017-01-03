import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';

const appRoutes: Routes = [{
    path: 'groups',
    component: GroupListComponent
}];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule {}