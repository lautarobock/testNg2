import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentDetailComponent, DocumentDetailRouteDecorator } from './document-detail/document-detail.component';
import { DocumentsService } from './documents.service';
import { TemplatesModule } from '../templates/templates.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // DocumentsRoutingModule,
    TemplatesModule
  ],
  declarations: [DocumentDetailComponent, DocumentDetailRouteDecorator],
  exports: [DocumentDetailComponent],
  providers: [DocumentsService],
  
})
export class DocumentsModule { }
