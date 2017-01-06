import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { UtilModule } from '../util/util.module';
import { TemplateLoaderDirective, Test } from './template-loader.directive';
import { TabContentComponent } from './tab-content/tab-content.component';

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
  declarations: [TemplateLoaderDirective, Test, TabContentComponent],
  entryComponents: [Test, TabContentComponent]
})
export class TemplatesModule { }
