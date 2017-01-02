import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component'
import { UserEditComponent } from './user/user-edit/user-edit.component'

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