import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { VariableListComponent } from './variable-list/variable-list.component';
import { VariablesRoutingModule } from './variables-routing.module';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';
import { VariablesService } from './variables.service';
import { VariableEditComponent, VariableEditRouteDecorator, VariableEditDialogDecorator, VariableEditDialog } from './variable-edit/variable-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VariablesRoutingModule,
    MaterialModule,
    UtilModule
  ],
  entryComponents: [VariableEditDialogDecorator],
  declarations: [VariableListComponent, VariableEditComponent, VariableEditRouteDecorator, VariableEditDialogDecorator],
  providers: [VariablesService, VariableEditDialog]
})
export class VariablesModule { }
