import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-editor',
  templateUrl: './date-picker-editor.component.html',
  styleUrls: ['./date-picker-editor.component.css']
})
@RegisterEditor(EditorType.DatePicker)
export class DatePickerEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() { }

  change(v:NgbDateStruct) {
    this.value().update(new Date(v.year,v.month,v.day));
  }
}

@Pipe({name: 'date2Model'})
export class Date2Model implements PipeTransform {
  transform(date) : NgbDateStruct {
    if ( date ) {
      date = new Date(date);
      return {
        year: date.getYear() + 1900,
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    } else {
      return null;
    }
  }
}