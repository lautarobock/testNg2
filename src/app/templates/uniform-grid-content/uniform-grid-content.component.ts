import { Component, OnInit } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';

@Component({
  selector: 'app-uniform-grid-content',
  templateUrl: './uniform-grid-content.component.html',
  styleUrls: ['./uniform-grid-content.component.css']
})
@RegisterTemplate(ContentType.UniformGrid)
export class UniformGridContentComponent extends AbstractContentComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}