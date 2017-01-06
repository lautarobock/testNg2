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

  // widths = [];

  constructor() {
    super();
   }

  ngOnInit() {
    // let sum = 0;
    // let total = _.sumBy(uniformGrid.children, function (component) {
    //     return component.property('Colspan',1);
    // });
    // angular.forEach(uniformGrid.children, function (component, idx) {
    //     if (idx === uniformGrid.children.length - 1) {
    //         uniformGrid.widths.push(100-sum);
    //     } else {
    //         var value = Math.round(100 / total) * component.property('Colspan', 1);
    //         uniformGrid.widths.push(value);
    //         sum += value;
    //     }
    // });
  }

}