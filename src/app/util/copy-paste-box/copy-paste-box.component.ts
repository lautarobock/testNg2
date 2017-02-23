import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'copy-paste-box',
  templateUrl: './copy-paste-box.component.html',
  styleUrls: ['./copy-paste-box.component.css']
})
export class CopyPasteBoxComponent implements OnInit {

  @Input() value: string;
  @Output() onPaste = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    
  }

  paste(event) {
    this.value = event.clipboardData.getData('text/plain');
    this.onPaste.emit(this.value);
  }

}
