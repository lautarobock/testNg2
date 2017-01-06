import { Component, OnInit } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';


@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
@RegisterTemplate(ContentType.Tab)
export class TabContentComponent extends AbstractContentComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit() {
  }

}