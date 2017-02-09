import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentsService } from './documents.service';
import { TemplatesModule } from '../templates/templates.module';
import { SaveDocumentDialogComponent, SaveDocumentDialog } from './save-document-dialog/save-document-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // DocumentsRoutingModule,
    TemplatesModule
  ],
  declarations: [DocumentDetailComponent, SaveDocumentDialogComponent],
  entryComponents: [SaveDocumentDialogComponent],
  exports: [DocumentDetailComponent],
  providers: [DocumentsService, SaveDocumentDialog],
  
})
export class DocumentsModule { }
