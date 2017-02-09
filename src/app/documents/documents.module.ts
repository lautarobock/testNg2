import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentsService } from './documents.service';
import { TemplatesModule } from '../templates/templates.module';
import { SaveDocumentDialogComponent } from './save-document-dialog/save-document-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // DocumentsRoutingModule,
    TemplatesModule
  ],
  declarations: [DocumentDetailComponent, SaveDocumentDialogComponent],
  exports: [DocumentDetailComponent],
  providers: [DocumentsService],
  
})
export class DocumentsModule { }
