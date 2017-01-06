import { Component, Injectable, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TabContentComponent } from './tab-content/tab-content.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { AbstractContentComponent, ContentType } from './abstract-content';

class TemplateLoaderRegister {

  private _templates = {};

  public register(type: ContentType, clazz) {
    this._templates[ContentType[type]] = clazz;
  }

  public get(type: ContentType) {
    return this._templates[type];
  }
}

let TEMPLATE_REGISTER = new TemplateLoaderRegister();

export function RegisterTemplate(type: ContentType) {
  return function(target) {
    TEMPLATE_REGISTER.register(type, target);
  }
}

@Directive({
  selector: 'template-loader'
})
export class TemplateLoaderDirective {

  @Input() content: any;

  constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnChanges () {
    if (!this.content) return;

    let factory = this.componentFactoryResolver.resolveComponentFactory(TEMPLATE_REGISTER.get(this.content.contentType));

    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    // add inputs first !! otherwise component/template crashes ..
    let instance: AbstractContentComponent = <AbstractContentComponent>comp.instance;
    instance.content = this.content;

    // all inputs set? add it to the DOM ..
    this.vcRef.insert(comp.hostView);

  }
}

