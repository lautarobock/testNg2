import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MdDataTable, MdDataTableSelectableRow, MdDataTableHeaderSelectableRow } from 'ng2-material/components/data-table';
/**
 * Unified point for import MdDataTable (not work fine, WIP)
 */
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [MdDataTable, MdDataTableSelectableRow, MdDataTableHeaderSelectableRow],
  exports: [MdDataTable, MdDataTableSelectableRow, MdDataTableHeaderSelectableRow]
})
export class UtilModule { }
