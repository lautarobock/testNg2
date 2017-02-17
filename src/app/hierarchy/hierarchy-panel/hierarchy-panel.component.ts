import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HierarchyService } from '../hierarchy.service';

@Component({
  selector: 'app-hierarchy-panel',
  templateUrl: './hierarchy-panel.component.html',
  styleUrls: ['./hierarchy-panel.component.css']
})
export class HierarchyPanelComponent implements OnInit {

  @Output() onSelect = new EventEmitter();
  versions: any[];
  selectedVersion: any;
  hierarchy: any[];
  options = {
    childrenField: 'nodes',
    isExpandedField: 'expanded',
    actionMapping: {
      mouse: {
        click: (tree,node) => {
          this.onSelect.emit({
            documentId:node.data.id, 
            versionId: this.selectedVersion.versionId, 
            name: node.data.name
          });
        }
      }
    }
  };

  constructor(
    private _hierarchyService: HierarchyService,
    private loadingService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.loadingService.start();
    this._hierarchyService.versions().subscribe(
      data => {
        this.versions = data;
        this.selectedVersion = data[0];
        this.loadingService.progress = 50;
        this.loadDocuments();
      },
      err => this.loadingService.reset()
    );
  }

  loadDocuments() {
    this._hierarchyService.documents(this.selectedVersion.versionId).subscribe(data => {
      this.hierarchy = this.markAsExpanded(data);
      this.loadingService.complete();
    });
  }

  changeVersion() {
    this.loadingService.start();
    this.loadDocuments();
  }

  markAsExpanded(data) {
    data[0].expanded = true;
    data[0].nodes.forEach(n => n.expanded =- true);
    return data;
  }

}
