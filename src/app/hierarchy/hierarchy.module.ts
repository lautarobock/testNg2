import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HierarchyPanelComponent } from './hierarchy-panel/hierarchy-panel.component';
import { HierarchyService } from './hierarchy.service';
import { TreeModule } from 'angular2-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule
  ],
  exports: [HierarchyPanelComponent],
  declarations: [HierarchyPanelComponent],
  providers: [HierarchyService]
})
export class HierarchyModule { }
