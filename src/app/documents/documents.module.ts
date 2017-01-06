import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentsService } from './documents.service';
import { TemplatesModule } from '../templates/templates.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UtilModule,
    DocumentsRoutingModule,
    TemplatesModule
  ],
  declarations: [DocumentDetailComponent],
  providers: [DocumentsService],
  
})
export class DocumentsModule { }
