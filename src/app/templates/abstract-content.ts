import { HostListener } from '@angular/core';
import { Document, Values } from '../documents/documents.service';

export class AbstractContentComponent {
    public content: ContentData;
    public document: Document;
    public data: Values;

    private _jsonProperties = undefined;
    jsonProperties() {
        if ( !this._jsonProperties ) {
            if ( this.content.jsonDisplayedProperties ) {
                this._jsonProperties = eval('(' +this.content.jsonDisplayedProperties + ')')    ;
            } else {
                this._jsonProperties = {};
            }
        }
        return this._jsonProperties;
    }
}

export class AbstractEditorComponent {
    public editor: EditorData;
    public parent: AbstractContentComponent;
    public document: Document;
    public data: Values;
    public isOver: boolean = false;

    variableId() : number {
        return this.editor.variableIds[0];
    }

    value(variableId?) {
        return this.data.get(variableId || this.variableId());
    }

    expression() {
        return this.data.get(this.variableId()).expression();
    }

    comment() {
        return this.data.get(this.variableId()).comment();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.isOver = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isOver = false;
    }
}


export enum ContentType {
    None = 0,
    Tab = 1,
    Group = 2,
    Expander = 3,
    Panel = 4,
    VariableEditor = 5,
    UniformGrid = 6
}

export enum EditorType {
    None = 0,
    TextBox = 1,
    DatePicker = 2,
    TimeSeriesGrid = 3,
    LineItemGrid = 4,
    NumericEditor = 5,
    CheckBox = 6,
    Memo = 7,
    Image = 8,
    Spreadsheet = 9,
    Map = 10,
    Attachment = 11,
    Visualization = 12,
    WebView = 13,
    WorkingInterestGrid = 14,
    ScalarGrid = 15,
    WellView = 16
}

export class EditorData {
    
    constructor(
        public editorType: EditorType,
        public variableIds: number[]
    ) {}
}

export class ContentData {
    
    constructor(
        public contentType: ContentType,
        public name: string,
        public editorType: EditorType,
        public informationText: string,
        public editors: EditorData[],
        public jsonDisplayedProperties: any
    ) {}
}
