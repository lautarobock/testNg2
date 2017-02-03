import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Value } from '../../../documents/documents.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  value:Value;

  constructor(public dialogRef: MdDialogRef<CommentDialogComponent>) { }

  ngOnInit() {
  }

  ok(comment) {
    this.value.updateComment(comment);
    this.dialogRef.close(true)
  }
}

@Injectable()
export class CommentDialog {

  constructor(private dialog: MdDialog) {}

  open(value: Value) {
    let ref = this.dialog.open(CommentDialogComponent,{width: '600px'})
    ref.componentInstance.value  = value;
    return ref.afterClosed();
  }
}