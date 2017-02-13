import { Component, OnInit } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';

@Component({
  selector: 'app-expander-content',
  templateUrl: './expander-content.component.html',
  styleUrls: ['./expander-content.component.css']
})
@RegisterTemplate(ContentType.Expander)
export class ExpanderContentComponent extends AbstractContentComponent implements OnInit {

  isExpanded: boolean = true;
  
  constructor() {
    super();
   }

  ngOnInit() {
    let tmp = this.jsonProperties().IsExpanded;
    if ( tmp === null || tmp === undefined ) tmp = true;
    this.isExpanded = tmp;
  }

}
