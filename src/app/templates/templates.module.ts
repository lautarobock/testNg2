import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';
import { TemplateLoaderDirective, EditorLoaderDirective } from './template-loader.directive';
import { TabContentComponent } from './tab-content/tab-content.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { UniformGridContentComponent } from './uniform-grid-content/uniform-grid-content.component';
import { ExpanderContentComponent } from './expander-content/expander-content.component';
import { GroupContentComponent } from './group-content/group-content.component';
import { VariableEditorContentComponent } from './variable-editor-content/variable-editor-content.component';
import { TextBoxEditorComponent } from './variable-editor-content/text-box-editor/text-box-editor.component';
import { MemoEditorComponent } from './variable-editor-content/memo-editor/memo-editor.component';
import { AttachmentEditorComponent } from './variable-editor-content/attachment-editor/attachment-editor.component';
import { MapEditorComponent } from './variable-editor-content/map-editor/map-editor.component';
import { DatePickerEditorComponent } from './variable-editor-content/date-picker-editor/date-picker-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UtilModule
  ],
  exports: [
    TemplateLoaderDirective,
    EditorLoaderDirective
  ],
  declarations: [
    TemplateLoaderDirective,
    EditorLoaderDirective, 
    TabContentComponent, 
    PanelContentComponent, 
    UniformGridContentComponent, 
    ExpanderContentComponent, 
    GroupContentComponent, 
    VariableEditorContentComponent, 
    TextBoxEditorComponent, 
    MemoEditorComponent, 
    AttachmentEditorComponent, 
    MapEditorComponent, 
    DatePickerEditorComponent
  ],
  entryComponents: [
    TabContentComponent, 
    PanelContentComponent, 
    UniformGridContentComponent, 
    ExpanderContentComponent, 
    GroupContentComponent,
    VariableEditorContentComponent,
    TextBoxEditorComponent,
    MemoEditorComponent, 
    AttachmentEditorComponent, 
    MapEditorComponent, 
    DatePickerEditorComponent
  ]
})
export class TemplatesModule { }
