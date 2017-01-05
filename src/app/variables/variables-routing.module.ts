import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariableListComponent } from './variable-list/variable-list.component';
import { VariableEditRouteDecorator } from './variable-edit/variable-edit.component';

const appRoutes: Routes = [{
    path: 'variables',
    component: VariableListComponent
},{
    path: 'variables/:id',
    component: VariableEditRouteDecorator
}];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class VariablesRoutingModule {}