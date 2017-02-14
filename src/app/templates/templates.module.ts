import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { DatePickerEditorComponent, Date2Model } from './variable-editor-content/date-picker-editor/date-picker-editor.component';
import { ImageEditorComponent } from './variable-editor-content/image-editor/image-editor.component';
import { CheckBoxEditorComponent } from './variable-editor-content/check-box-editor/check-box-editor.component';
import { NumericEditorComponent } from './variable-editor-content/numeric-editor/numeric-editor.component';
import { SpreadsheetEditorComponent } from './variable-editor-content/spreadsheet-editor/spreadsheet-editor.component';
import { VisualizationEditorComponent } from './variable-editor-content/visualization-editor/visualization-editor.component';
import { WebViewEditorComponent } from './variable-editor-content/web-view-editor/web-view-editor.component';
import { WorkingInterestGridEditorComponent } from './variable-editor-content/working-interest-grid-editor/working-interest-grid-editor.component';
import { ScalarGridEditorComponent } from './variable-editor-content/scalar-grid-editor/scalar-grid-editor.component';
import { WellViewEditorComponent } from './variable-editor-content/well-view-editor/well-view-editor.component';
import { TimeSeriesGridEditorComponent } from './variable-editor-content/time-series-grid-editor/time-series-grid-editor.component';
import { LineItemGridEditorComponent } from './variable-editor-content/line-item-grid-editor/line-item-grid-editor.component';
import { ChartsModule } from 'ng2-charts';
import { CommentDialogComponent, CommentDialog, OpenComment } from './variable-editor-content/comment-dialog/comment-dialog.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UtilModule } from '../util/util.module';
import { ExpressionDialogComponent, ExpressionComment, ExpressionDialog } from './variable-editor-content/expression-dialog/expression-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    FileUploadModule,
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
    DatePickerEditorComponent, 
    ImageEditorComponent, 
    CheckBoxEditorComponent, 
    NumericEditorComponent, 
    SpreadsheetEditorComponent, 
    VisualizationEditorComponent, 
    WebViewEditorComponent, 
    WorkingInterestGridEditorComponent, 
    ScalarGridEditorComponent,
    WellViewEditorComponent, 
    TimeSeriesGridEditorComponent, 
    LineItemGridEditorComponent, 
    CommentDialogComponent,
    Date2Model,
    OpenComment,
    ExpressionDialogComponent,
    ExpressionComment
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
    DatePickerEditorComponent, 
    ImageEditorComponent, 
    CheckBoxEditorComponent, 
    NumericEditorComponent, 
    SpreadsheetEditorComponent, 
    VisualizationEditorComponent, 
    WebViewEditorComponent, 
    WorkingInterestGridEditorComponent, 
    ScalarGridEditorComponent,
    WellViewEditorComponent, 
    TimeSeriesGridEditorComponent, 
    LineItemGridEditorComponent, 
    CommentDialogComponent,
    ExpressionDialogComponent
  ],
  providers: [CommentDialog, ExpressionDialog]
})
export class TemplatesModule { }
