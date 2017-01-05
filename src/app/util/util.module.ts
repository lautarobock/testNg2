import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { 
  MdDataTable, 
  MdDataTableSelectableRow, 
  MdDataTableHeaderSelectableRow
} from 'ng2-material/components/data-table';
import { 
  MdPagination,
  MdPaginationItemsPerPage,
  MdPaginationRange,
  MdPaginationControls,
  PaginationService
} from 'ng2-material/components/pagination';
/**
 * Unified point for import MdDataTable (not work fine, WIP)
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  providers: [PaginationService],
  declarations: [MdDataTable, MdDataTableSelectableRow, MdDataTableHeaderSelectableRow, MdPagination, MdPaginationItemsPerPage, MdPaginationRange, MdPaginationControls],
  exports: [MdDataTable, MdDataTableSelectableRow, MdDataTableHeaderSelectableRow, MdPagination, MdPaginationItemsPerPage, MdPaginationRange, MdPaginationControls]
})
export class UtilModule { }
