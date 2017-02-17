import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-default-view',
  template: '<div style="margin: 1em">Welcome to Dataflow</div>'
})
export class DefaultComponent {
}

const appRoutes: Routes = [{
    path: 'default',
    component: DefaultComponent
}, {
    path: '',
    redirectTo: '/default',
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {})],
    declarations: [DefaultComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}

