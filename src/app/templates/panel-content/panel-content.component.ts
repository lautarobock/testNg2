import { Component, OnInit } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';

@Component({
  selector: 'app-panel-content',
  templateUrl: './panel-content.component.html',
  styleUrls: ['./panel-content.component.css']
})
@RegisterTemplate(ContentType.Panel)
export class PanelContentComponent extends AbstractContentComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}