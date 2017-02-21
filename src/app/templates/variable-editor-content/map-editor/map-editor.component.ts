import { serializePaths } from '@angular/router/src/url_tree';
import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
// import { terraformer } from 'terraformer-wkt-parser'
declare var Terraformer: any;

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
    return this.value().safe() ? new Map(this.value().safe()) : null;
  }
}

const ICONS ={ '2aacd40a-318d-44e9-a7c2-e4b34fd15aa9': 'Area.png', '795854e2-29cf-4a1b-b364-12c2bb189ec2': 'BusinessUnit.png', '4dac86ef-0515-4a81-a76b-0e874611ace6': 'Company.png', '910baff9-d630-4a84-9c46-93d198bb233b': 'Component.png', 'cb6e17c2-b60d-4122-b9e7-929f604266e4': 'Consolidation.png', 'f0d41e7f-9d82-42d3-8b9f-0494c6644ab5': 'Country.png', '3131793e-7609-4ade-9609-895fae05b61b': 'Derrick.png', '2cea5955-498c-4d74-a11b-0fdb62fc59b4': 'Development.png', '09dfb4d1-0581-4fc7-8417-fdf2f63d98f4': 'Discovery.png', '42b7cb79-ff20-4922-99da-e3909efbe104': 'Document.png', 'cf920443-bb4f-47d0-af0b-c68c25ea609e': 'Dry.png', '160f80f7-3cd1-44f3-a578-42a9c64b1fd3': 'ExplorationLicense.png', '3f6ac604-3cb4-43d6-9661-ee5bda3f4f83': 'GasCompleted.png', '8aa3f58b-077a-4eaa-a469-6d7ae9eba00f': 'Lead.png', 'fec6f49a-a391-46a9-8322-edb085ca71da': 'License.png', '26bcd1d7-1b51-4bb7-bf15-02b5f0b287f9': 'LiquidNaturalGasShip.png', 'e11ac445-f521-4838-9d0e-62a3e9906259': 'OffshoreField.png', 'eae60b57-727b-4303-a28b-04a1c6c92648': 'OffshorePlatform.png', 'a296790a-63ac-4b8d-ae38-9c56d1dfafd9': 'OilAndGasCompleted.png', '7fa1062f-8eb3-4dff-9ea9-92bfd8b975fc': 'OilCompleted.png', 'c4ba49ab-a07a-4394-9603-8c24f3a7edf0': 'Pipeline.png', 'f2d6d91d-9791-4f2f-8f75-5ddaa81d5c94': 'PreDevelopment.png', '3a2fb798-1a49-4318-a87f-4b7cb96cc507': 'Producing.png', '5b098c69-40c7-476a-8c2d-1c19401e5e4a': 'ProductionLicense.png', '7753e968-d968-43b7-afa0-ba2cb5df2ef1': 'Project.png', 'cce21839-4182-48b8-9176-286718d14a84': 'PumpJack.png', '8647a122-609d-4030-b1aa-cce722089171': 'OnshoreField.png', '07b4b2e1-b8a9-4b94-8927-e8447ddedd71': 'OffshoreRefinery.png', 'ae4a901d-880b-4508-b7b7-ea45c777038b': 'Region.png', '316d07d7-752a-4cd4-ae5d-31731061eb80': 'Subsurface.png', 'f96d0d7f-2ee2-4342-a1cc-15c5f30974bb': 'Tower.png', '5e913f6e-bd2c-40db-992a-b01338ea6015': 'WellType1.png', '410441d0-10a7-4f1c-a081-2d47da4f8a38': 'WellType2.png', '177329a4-df41-41af-ba81-eae7457a4375': 'WellType3.png', '40287f41-5a38-43d5-9e58-3d0b30b4d45c': 'WellType4.png', '95b21025-d82f-4803-a548-c6190eeb6dc8': 'WellType5.png', '9032b5f3-ac2e-46de-b20a-8afa48b5a903': 'WellType6.png', '350f0cf4-dae0-4b07-a934-e26c1c4e825a': 'WellType7.png', 'd93b10ea-cf49-4c39-a468-39c48996d292': 'WellType8.png', 'e2bb1960-a831-4dc6-8cb2-d3a06e3feed9': 'WellType9.png' };

class Point {
  public latitude: number;
  public longitude: number;
  constructor(obj) {
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
  }
}

class GeoJson {
  private type: string;
  private id: string;
  private properties: {
      name: string,
      tooltip: string,
      itemId: string
  }
  private geometry: any;
  constructor(item: ChildItem) {
    this.type = 'Feature';
    this.id = item.itemId;
    this.properties = {
      itemId: item.itemId,
      name: item.name,
      tooltip: `${item.name} <br/> ${item.description}`
    };
    this.geometry = Terraformer.WKT.parse(item.wktFormat);
  }
}

class ChildItem {
  public itemId: string;
  public name: string;
  public description: string;
  public isVisible: boolean;
  public wktFormat: string;
  public geoJson: GeoJson;
  public isPushpin: boolean;
  public mapIconId: string;
  public isAttachment: boolean;
  constructor(obj) {
    this.itemId = obj.itemId;
    this.name = obj.name;
    this.description = obj.description;
    this.isVisible = obj.isVisible;
    this.wktFormat = obj.wktFormat;
    this.geoJson = new GeoJson(this);
    this.isPushpin = obj.isPushpin;
    this.mapIconId = obj.mapIconId;
    this.isAttachment = obj.isAttachment;
  }

  hasIcon() {
    return this.mapIconId !== '00000000-0000-0000-0000-000000000000';
  }

  iconSrc() {
    return  `assets/images/MapItems/${ICONS[this.mapIconId]}`;
  }

  isPoint() : boolean {
    return this.wktFormat.trim().startsWith('POINT');
  }
}

class GeoLayer {
  public styleData: any;
  public layerId: string;
  public name: string;
  public isVisible: boolean;
  public childItems: Array<ChildItem>;
  public includedTags: Array<string>;
  public useStylingFromTag: boolean;
  constructor(obj) {
    this.layerId = obj.layerId;
    this.name = obj.name;
    this.isVisible = obj.isVisible;
    this.childItems = obj.childItems.map(child => new ChildItem(child));
    this.includedTags = obj.includedTags;
    this.useStylingFromTag = obj.useStylingFromTag;
    this.styleData = obj.styleData;//TODO parse XML
  }

  points() {
    return this.childItems.filter(item => item.isPoint());
  }

  lines() {
    return this.childItems.filter(item => !item.isPoint());
  }
}

class Map {
  public mapMode: string;
  public centre: Point;
  public zoomLevel: number;
  public geoLayers: Array<GeoLayer>;

  constructor(conf){
    this.mapMode = conf.mapMode;
    this.centre = new Point(conf.centre);
    this.zoomLevel = conf.zoomLevel;
    this.geoLayers = conf.geoLayers.map(layer => new GeoLayer(layer));
  };
}