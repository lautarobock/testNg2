import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-visualization-editor',
  templateUrl: './visualization-editor.component.html',
  styleUrls: ['./visualization-editor.component.css']
})
@RegisterEditor(EditorType.Visualization)
export class VisualizationEditorComponent extends AbstractEditorComponent implements OnInit {
  
  public chartData:Array<any> = [];
  public chartLabels:Array<any> = [];
  public chartOptions:any = {
    responsive: true
  };
  public chartLegend:boolean = true;
  public chartType:string = 'line';

  constructor() { 
    super();
  }

  ngOnInit() {
    this.chartLabels = this.value().values().map(v=>v.periodString);
    this.chartData = this.editor.variableIds.map(variableId => {
      return {
        label: this.document.variableDefinitions[variableId].prompt,
        data: this.value(variableId).values().map(v=>v.value)
      }
    });
    this.chartType = (this.parent.jsonProperties().Type || 'line').toLowerCase();
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
