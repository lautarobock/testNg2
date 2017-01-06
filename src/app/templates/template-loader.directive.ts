import { Component, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TabContentComponent } from './tab-content/tab-content.component';

@Component({
  selector: 'app-test',
  template: 'Test ({{model.name}})'
})
export class Test {

  public model;
  
  constructor() { }


}

const TEMPLATES = {
  TEST: Test,
  TAB: TabContentComponent
};


@Directive({
  selector: 'template-loader'
})
export class TemplateLoaderDirective {

  @Input() content: any;

  constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnChanges () {
    if (!this.content) return;

    let factory = this.componentFactoryResolver.resolveComponentFactory(TEMPLATES[this.content.contentType.toUpperCase()]);

    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    // add inputs first !! otherwise component/template crashes ..
    comp.instance['content'] = this.content;

    // all inputs set? add it to the DOM ..
    this.vcRef.insert(comp.hostView);

  }
}
