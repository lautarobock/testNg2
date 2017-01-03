import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDataTable } from 'ng2-material/components/data-table';
/**
 * Unified point for import MdDataTable (not work fine, WIP)
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MdDataTable],
  exports: [MdDataTable]
})
export class UtilModule { }
