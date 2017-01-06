export class AbstractContentComponent {
    public content: ContentData;
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
    WellView
}

export class ContentData {
    
    constructor(
        public contentType: ContentType,
        public name: string,
        public editorType: EditorType,
        public informationText: string
    ) {}
}
