import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component'
import { UserEditComponent } from './users/user-edit/user-edit.component'

const appRoutes: Routes = [{
    path: 'users',
    component: UserListComponent
},{
    path: 'users/:id',
    component: UserEditComponent
},{
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{})],
    exports: [RouterModule]
})
export class AppRoutingModule {}