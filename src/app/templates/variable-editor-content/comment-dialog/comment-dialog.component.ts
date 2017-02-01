import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  comment:string;

  constructor(public dialogRef: MdDialogRef<CommentDialogComponent>) { }

  ngOnInit() {
  }

}

@Injectable()
export class CommentDialog {

  constructor(private dialog: MdDialog) {}

  open(comment) {
    let ref = this.dialog.open(CommentDialogComponent,{width: '600px'})
    ref.componentInstance.comment  = comment;
    return ref.afterClosed();
  }
}