export class Document {
  
  public readonly:boolean = false;

  constructor(
    public documentId: number,
    public documentName: string,
    public templateVariables: any[],
    public variableDefinitions: any,
    public versionId: number,
    public hasExclusiveLock: boolean,
    public documentLock: any,
    public conceptDefinition: any,
    public revisions: any[],
    public template: any
  ) {}

}

export enum LineItemType {
  DatedValue,
  EscalatingValue,
  Expression,
  PeriodicValues,
  // ScalarValue
}

export enum DataType {
  ScalarString,
  ScalarDateTime
}

export class DocumentStatus {
  constructor(
    public activeWorkflows: any[] = [],
    public issues: DocumentStatusIssue[] = []
  ) {}

  errors() {
    return this.issues.filter(i => i.severity.toString() === DocumentStatusIssueSeverty[DocumentStatusIssueSeverty.Error]);
  }

  warnings() {
    return this.issues.filter(i => i.severity.toString() === DocumentStatusIssueSeverty[DocumentStatusIssueSeverty.Warning]);
  }

  informations() {
    return this.issues.filter(i => i.severity.toString() === DocumentStatusIssueSeverty[DocumentStatusIssueSeverty.Information]);
  }
}

export class DocumentStatusIssue {
  constructor(
    public alertGroup: string,
    public identifier: string, 
    public longMessageText: string,
    public longMessageTextFormatted: string,
    public messageText: string,
    public severity: DocumentStatusIssueSeverty
  ) {}
}

export enum DocumentStatusIssueSeverty {
  Information,
  Warning,
  Error
}