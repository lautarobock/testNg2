import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VariablesService, Variable } from '../variables.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-variable-edit',
  templateUrl: './variable-edit.component.html',
  styleUrls: ['./variable-edit.component.css']
})
export class VariableEditComponent  {
  
  @Input() variable: Variable = <Variable>{};

  constructor() { }

}

@Component({
  selector: 'app-variable-edit-route',
  templateUrl: './variable-edit-route.component.html'
})
export class VariableEditRouteDecorator implements OnInit {
  
  variable: Variable = <Variable>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _variableService: VariablesService
  ) {}

  ngOnInit() {
    this.route.params
    .switchMap((params:Params) => this._variableService.get(+params['id']))
    .subscribe((data: Variable) => this.variable = data);
  }
  
}

@Component({
  selector: 'app-variable-edit-dialog',
  templateUrl: './variable-edit-dialog.component.html'
})
export class VariableEditDialogDecorator {

  variable: Variable;

  constructor(public dialogRef: MdDialogRef<VariableEditDialogDecorator>) {}

}

@Injectable()
export class VariableEditDialog {

  constructor(private _variableService: VariablesService, private dialog: MdDialog) {}

  open(variableId) {
    this._variableService.get(variableId).subscribe(
      data => {
        let ref = this.dialog.open(VariableEditDialogDecorator,{width: '600px'})
        ref.componentInstance.variable = data;
      }
    )
  }

}