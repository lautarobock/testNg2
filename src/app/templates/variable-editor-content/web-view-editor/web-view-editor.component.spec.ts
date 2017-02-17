import { EditorData, EditorType } from '../../abstract-content';
import { Values } from '../../../documents/values.model';
import { VariableEditorContentComponent } from '../variable-editor-content.component';
import { WebViewEditorComponent } from './web-view-editor.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */


describe('WebViewEditorComponent', () => {
  let component: WebViewEditorComponent;
  let fixture: ComponentFixture<WebViewEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebViewEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebViewEditorComponent);
    component = fixture.componentInstance;
    component.data = new Values([{
      variableId: 1,
      values: [{
        value: 'http://www.google.com'
      }]
    }]);
    component.editor = new EditorData(EditorType.WebView,[1]);
    component.parent = <VariableEditorContentComponent>{
      width: () => 0,
      height: () => 0
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
