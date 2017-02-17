import { serializePaths } from '@angular/router/src/url_tree';
import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css']
})
@RegisterEditor(EditorType.Map)
export class MapEditorComponent extends AbstractEditorComponent implements OnInit {

  width: string;
  height: string;
  points = [];

  constructor() {
    super();
   }

  ngOnInit() {
    if ( (<any>this.parent).width() && (<any>this.parent).width() !==0 ) {
      this.width = (<any>this.parent).width() + 'px';
    }
    this.height = ((<any>this.parent).height() || 600) + 'px';

  }

  map() {
    let map = new Map(this.value().safe());
  }



}

class Point {
  public latitude: number;
  public longitude: number;
  constructor(obj) {
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
  }
}

class ChildItem {
  constructor(
    public itemId: string,
    public name: string,
    public description: string,
    public isVisible: boolean,
    public wktFormat: string,
    public isPushpin: boolean,
    public mapIconId: string,
    public isAttachment: boolean
  ) {}
}

class GeoLayer {
  public styleData: any;
  constructor(
    public layerId: string,
    public name: string,
    public isVisible: boolean,
    public childItems: Array<ChildItem>,
    public includedTags: Array<string>,
    styleData: string,
    public useStylingFromTag: boolean
  ) {
    this.styleData = styleData;//TODO parse XML
  }
}

class Map {
  public mapMode: string;
  public centre: Point;
  public zoomLevel: number;
  public geoLayers: GeoLayer;

  constructor(conf){
    this.mapMode = conf.mapMode;
    this.centre = new Point(conf.centre);
    this.zoomLevel = conf.zoomLevel;
    this.geoLayers = conf.geoLayers;
  };
}