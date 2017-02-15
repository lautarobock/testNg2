import { Component, Injectable, Input, OnInit, Directive,ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TabContentComponent } from './tab-content/tab-content.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { AbstractContentComponent, AbstractEditorComponent, ContentType, EditorType, ContentData, EditorData } from './abstract-content';
import { Document, Values } from '../documents/documents.service';

class TemplateLoaderRegister {

  private _templates = {};

  public register(type: ContentType, clazz) {
    this._templates[ContentType[type]] = clazz;
  }

  public get(type: ContentType) {
    return this._templates[type];
  }
}

class EditorLoaderRegister {

  private _templates = {};

  public register(type: EditorType, clazz) {
    this._templates[EditorType[type]] = clazz;
  }

  public get(type: EditorType) {
    return this._templates[type];
  }
}

let TEMPLATE_REGISTER = new TemplateLoaderRegister();
let EDITOR_REGISTER = new EditorLoaderRegister();

export function RegisterTemplate(type: ContentType) {
  return function(target) {
    TEMPLATE_REGISTER.register(type, target);
  }
}

export function RegisterEditor(type: EditorType) {
  return function(target) {
    EDITOR_REGISTER.register(type, target);
  }
}

@Directive({
  selector: 'template-loader'
})
export class TemplateLoaderDirective {

  @Input() content: ContentData;
  @Input() document: Document;
  @Input() data: Values;
  @Input() scenario: any;

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
    instance.document = this.document;  
    instance.data = this.data;
    instance.scenario = this.scenario;
    // all inputs set? add it to the DOM ..
    this.vcRef.insert(comp.hostView);
  }
}

@Directive({
  selector: 'editor-loader'
})
export class EditorLoaderDirective {

  @Input() editor: EditorData;
  @Input() document: Document;
  @Input() data: Values;
  @Input() scenario: any;
  @Input() parent: AbstractContentComponent;

  constructor(private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnChanges () {
    if (!this.editor) return;
    let factory = this.componentFactoryResolver.resolveComponentFactory(EDITOR_REGISTER.get(this.editor.editorType));
    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
    // create component without adding it directly to the DOM
    let comp = factory.create(injector);
    // add inputs first !! otherwise component/template crashes ..
    let instance: AbstractEditorComponent = <AbstractEditorComponent>comp.instance;
    instance.editor = this.editor;
    instance.document = this.document;
    instance.data = this.data;
    instance.parent = this.parent;
    instance.scenario = this.scenario;
    // all inputs set? add it to the DOM ..
    this.vcRef.insert(comp.hostView);
  }
}

