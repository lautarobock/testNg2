import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'default-view',
  template: '<md-card style="margin: 1em">Welcome to Dataflow</md-card>'
})
export class DefaultComponent {
}

const appRoutes: Routes = [{
    path: 'default',
    component: DefaultComponent
},{
    path: '',
    redirectTo: '/default',
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{}), MaterialModule],
    declarations: [DefaultComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}

