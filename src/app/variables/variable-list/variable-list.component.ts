import { Component, OnInit } from '@angular/core';
import { MdSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { VariablesService } from '../variables.service';
import { VariableEditDialog } from '../variable-edit/variable-edit.component';

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.css']
})
export class VariableListComponent implements OnInit {

  variables: any[] = [];
  pagedItems: Array<any> = [];
  availableLength: Array<number> = [5, 10, 20];

  pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0
  };

  constructor(
    private _service: VariablesService, 
    private _router: Router,
    private _snackbar: MdSnackBar,
    private _variableDialog: VariableEditDialog
  ) { }

  ngOnInit() {
    this._service.all().subscribe(
      data => {
        this.variables = data;
        this.pagination.totalItems = data.length;
        this.refreshList();
      },
      err => this._snackbar.open(err.statusText,'Close')
    );
    
  }

  refreshList() {
    let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage,
      end = start + this.pagination.itemsPerPage;
    this.pagedItems = this.variables.slice(start, end);
  }

  detectChange(event) {
    if (event !== undefined && event.name === 'pagination_changed' && event.pagination !== undefined) {
      this.pagination = event.pagination;
      this.refreshList();
    }
  }

  edit(variable) {
    // this._router.navigate(['/variables', variable.id]);
    this._variableDialog.open(variable.id);
  }

}
