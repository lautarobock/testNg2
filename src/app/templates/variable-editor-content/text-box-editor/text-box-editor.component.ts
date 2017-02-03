import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { CommentDialog } from '../comment-dialog/comment-dialog.component';


@Component({
  selector: 'app-text-box-editor',
  templateUrl: './text-box-editor.component.html',
  styleUrls: ['./text-box-editor.component.css']
})
@RegisterEditor(EditorType.TextBox)
export class TextBoxEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor(private commentDialog: CommentDialog) { 
    super();
  }

  ngOnInit() {
    
  }

  openComment() {
    this.commentDialog.open(this.value()).subscribe(result => {
      if ( result !==undefined ) {
        //TODO, update comment
      }
    });
  }

}
