import { Component, OnInit } from '@angular/core';
import { MdSnackBar} from '@angular/material';
import { HierarchyService } from '../hierarchy.service';

@Component({
  selector: 'app-hierarchy-panel',
  templateUrl: './hierarchy-panel.component.html',
  styleUrls: ['./hierarchy-panel.component.css']
})
export class HierarchyPanelComponent implements OnInit {

  versions: any[];
  selectedVersion: any;
  hierarchy: any[];
  options = {
    childrenField: 'nodes' 
  };

  constructor(private _hierarchyService: HierarchyService, private _snackbar: MdSnackBar) { }

  ngOnInit() {
    this._hierarchyService.versions().subscribe(
      data => {
        this.versions = data;
        this.selectedVersion = data[0];
      },
      err => this._snackbar.open(err.statusText,'Close')
    )
  }

  loadDocuments() {
    this._hierarchyService.documents(this.selectedVersion.versionId).subscribe(
      data => this.hierarchy = data,
      err => this._snackbar.open(err.statusText,'Close')
    )
  }

}
