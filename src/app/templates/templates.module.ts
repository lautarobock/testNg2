import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';
import { TemplateLoaderDirective } from './template-loader.directive';
import { TabContentComponent } from './tab-content/tab-content.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { UniformGridContentComponent } from './uniform-grid-content/uniform-grid-content.component';
import { ExpanderContentComponent } from './expander-content/expander-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UtilModule
  ],
  exports: [
    TemplateLoaderDirective
  ],
  declarations: [
    TemplateLoaderDirective, 
    TabContentComponent, 
    PanelContentComponent, 
    UniformGridContentComponent, 
    ExpanderContentComponent
  ],
  entryComponents: [
    TabContentComponent, 
    PanelContentComponent, 
    UniformGridContentComponent, 
    ExpanderContentComponent
  ]
})
export class TemplatesModule { }
