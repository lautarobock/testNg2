import { Component, OnInit } from '@angular/core';
import { AbstractContentComponent, ContentType } from '../abstract-content';
import { RegisterTemplate } from '../template-loader.directive';

@Component({
  selector: 'app-group-content',
  templateUrl: './group-content.component.html',
  styleUrls: ['./group-content.component.css']
})
@RegisterTemplate(ContentType.Group)
export class GroupContentComponent extends AbstractContentComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
