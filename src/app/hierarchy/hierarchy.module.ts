import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HierarchyPanelComponent } from './hierarchy-panel/hierarchy-panel.component';
import { HierarchyService } from './hierarchy.service';
import { TreeModule } from 'angular2-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TreeModule
  ],
  exports: [HierarchyPanelComponent],
  declarations: [HierarchyPanelComponent],
  providers: [HierarchyService]
})
export class HierarchyModule { }
