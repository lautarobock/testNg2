import { Component, OnInit } from '@angular/core';
import { AbstractEditorComponent, EditorType } from '../../abstract-content';
import { RegisterEditor } from '../../template-loader.directive';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-web-view-editor',
  templateUrl: './web-view-editor.component.html',
  styleUrls: ['./web-view-editor.component.css']
})
@RegisterEditor(EditorType.WebView)
export class WebViewEditorComponent extends AbstractEditorComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer) { 
    super();
  }

  ngOnInit() {

  }

  safeUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.value().safe());
  }
}
