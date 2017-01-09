import { Document, Values } from '../documents/documents.service';

export class AbstractContentComponent {
    public content: ContentData;
    public document: Document;
    public data: Values;
}

export class AbstractEditorComponent {
    public editor: EditorData;
    public document: Document;
    public data: Values;
}


export enum ContentType {
    Group, 
    Panel,
    RadioPanel,
    Tab,
    UniformGrid,
    VariableEditor,
    Expander
}

export enum EditorType {
    CheckBox,
    ComboBox,
    DateTimePicker,
    Label,
    None,
    Radio,
    TextBox,
    TypeAhead,
    TimeSeriesGrid,
    LineItemGrid,
    ScalarGrid,
    NumericEditor,
    Image,
    Spreadsheet,
    Map,
    Attachment,
    Visualization,
    WebView,
    WorkingInterestGrid,
    WellView,
    Memo
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
        public editors: EditorData[]
    ) {}
}
