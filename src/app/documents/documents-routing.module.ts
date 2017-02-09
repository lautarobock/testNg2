import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailRouteDecorator } from './document-detail/document-detail.component';

const appRoutes: Routes = [{
    path: 'document/:id',
    component: DocumentDetailRouteDecorator
}];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {}