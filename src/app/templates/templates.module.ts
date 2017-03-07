import { DecimalPipe, DatePipe } from '@angular/common';
import { UtilModule } from '../util/util.module';
import { ExpanderContentComponent } from './expander-content/expander-content.component';
import { GroupContentComponent } from './group-content/group-content.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { EditorLoaderDirective, TemplateLoaderDirective } from './template-loader.directive';
import { UniformGridContentComponent } from './uniform-grid-content/uniform-grid-content.component';
import { AttachmentEditorComponent } from './variable-editor-content/attachment-editor/attachment-editor.component';
import { CheckBoxEditorComponent } from './variable-editor-content/check-box-editor/check-box-editor.component';
import {
    CommentDialog,
    CommentDialogComponent,
    OpenComment
} from './variable-editor-content/comment-dialog/comment-dialog.component';
import {
    Date2Model,
    DatePickerEditorComponent
} from './variable-editor-content/date-picker-editor/date-picker-editor.component';
import {
    ExpressionComment,
    ExpressionDialog,
    ExpressionDialogComponent
} from './variable-editor-content/expression-dialog/expression-dialog.component';
import { ImageEditorComponent } from './variable-editor-content/image-editor/image-editor.component';
import {
    LineItemGridEditorComponent
} from './variable-editor-content/line-item-grid-editor/line-item-grid-editor.component';
import { MapEditorComponent } from './variable-editor-content/map-editor/map-editor.component';
import { MemoEditorComponent } from './variable-editor-content/memo-editor/memo-editor.component';
import { NumericEditorComponent } from './variable-editor-content/numeric-editor/numeric-editor.component';
import { ScalarGridEditorComponent } from './variable-editor-content/scalar-grid-editor/scalar-grid-editor.component';
import { SpreadsheetEditorComponent } from './variable-editor-content/spreadsheet-editor/spreadsheet-editor.component';
import { TextBoxEditorComponent } from './variable-editor-content/text-box-editor/text-box-editor.component';
import {
    TimeSeriesGridEditorComponent
} from './variable-editor-content/time-series-grid-editor/time-series-grid-editor.component';
import { VariableEditorContentComponent } from './variable-editor-content/variable-editor-content.component';
import {
    VisualizationEditorComponent
} from './variable-editor-content/visualization-editor/visualization-editor.component';
import { WebViewEditorComponent } from './variable-editor-content/web-view-editor/web-view-editor.component';
import { WellViewEditorComponent } from './variable-editor-content/well-view-editor/well-view-editor.component';
import {
    WorkingInterestGridEditorComponent
} from './variable-editor-content/working-interest-grid-editor/working-interest-grid-editor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularOpenlayersModule } from 'angular2-openlayers';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { LineItemDatedValueComponent } from './variable-editor-content/line-item-grid-editor/line-item-dated-value/line-item-dated-value.component';
import { LineItemEscalatingValueComponent } from './variable-editor-content/line-item-grid-editor/line-item-escalating-value/line-item-escalating-value.component';
import { LineItemPeriodicValuesComponent } from './variable-editor-content/line-item-grid-editor/line-item-periodic-values/line-item-periodic-values.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    FileUploadModule,
    UtilModule,
    AngularOpenlayersModule
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
    ExpressionComment,
    LineItemDatedValueComponent,
    LineItemEscalatingValueComponent,
    LineItemPeriodicValuesComponent
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
  providers: [CommentDialog, ExpressionDialog, DecimalPipe, DatePipe]
})
export class TemplatesModule { }
