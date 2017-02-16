import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentsService } from './documents.service';
import { TemplatesModule } from '../templates/templates.module';
import { SaveDocumentDialogComponent, SaveDocumentDialog } from './save-document-dialog/save-document-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MathService } from './math.service';
import { DocumentStatusComponent, DocumentStatusDialog } from './document-status/document-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // DocumentsRoutingModule,
    TemplatesModule,
    NgbModule
  ],
  declarations: [DocumentDetailComponent, SaveDocumentDialogComponent, DocumentStatusComponent],
  entryComponents: [SaveDocumentDialogComponent, DocumentStatusComponent],
  exports: [DocumentDetailComponent],
  providers: [DocumentsService, SaveDocumentDialog, MathService, DocumentStatusDialog],
  
})
export class DocumentsModule { }
