import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ConfirmationDialogComponent, ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { PromptDialogComponent, PromptDialog } from './prompt-dialog/prompt-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ConfirmationDialogComponent, PromptDialogComponent],
  entryComponents: [ConfirmationDialogComponent, PromptDialogComponent],
  providers: [ConfirmationDialog, PromptDialog]
})
export class UtilModule { }
