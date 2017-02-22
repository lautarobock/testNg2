import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'copy-paste-box',
  templateUrl: './copy-paste-box.component.html',
  styleUrls: ['./copy-paste-box.component.css']
})
export class CopyPasteBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // @HostListener('onpaste',['$event']) onPaste(event) {
  //     console.log('PASTE',event)
  // }

  onPaste(event) {
    console.log('kk',event.clipboardData.getData('text/plain'))
  }

}
