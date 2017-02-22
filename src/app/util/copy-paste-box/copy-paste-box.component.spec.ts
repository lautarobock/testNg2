import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPasteBoxComponent } from './copy-paste-box.component';

describe('CopyPasteBoxComponent', () => {
  let component: CopyPasteBoxComponent;
  let fixture: ComponentFixture<CopyPasteBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyPasteBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyPasteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
