import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ConfirmationDialogComponent, ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { PromptDialogComponent, PromptDialog } from './prompt-dialog/prompt-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SyncScrollDirective } from './sync-scroll.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    NgbModule
  ],
  declarations: [ConfirmationDialogComponent, PromptDialogComponent, SyncScrollDirective],
  exports: [SyncScrollDirective],
  entryComponents: [ConfirmationDialogComponent, PromptDialogComponent],
  providers: [ConfirmationDialog, PromptDialog]
})
export class UtilModule { }
