import { Directive, ElementRef, EventEmitter, Input, Output, Renderer } from '@angular/core';

@Directive({
  selector: '[sync-scroll]'
})
export class SyncScrollDirective {

  @Input('sync-scroll') group: string;
  private static groups = {};
  private remove;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnChanges() {
    if (!this.group || this.group === '') return;
    let grid = this.el;
    SyncScrollDirective.groups[this.group] = SyncScrollDirective.groups[this.group] || [];
    SyncScrollDirective.groups[this.group].push(grid);
    this.remove = this.renderer.listen(this.el.nativeElement, 'scroll', (event) => {
      if (SyncScrollDirective.groups[this.group].length === 1) {
        SyncScrollDirective.groups[this.group] = [];
        this.remove();
        return;
      }
      SyncScrollDirective.groups[this.group].forEach(function (el) {
        if (el !== grid) {
          el.nativeElement.scrollLeft = grid.nativeElement.scrollLeft;
        }
      });
    })
  }

  ngOnDestroy() {
    if (!this.group || this.group === '') return;
    var idx = SyncScrollDirective.groups[this.group].indexOf(this.el);
    SyncScrollDirective.groups[this.group].splice(idx, 1);
    if (this.remove) this.remove();
  }
}

@Directive({
  selector: '[on-scroll]'
})
export class OnScrollDirective {

  @Output('on-scroll') onScroll = new EventEmitter();
  private remove;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() { 
    this.remove = this.renderer.listen(this.el.nativeElement, 'scroll', (event) => {
      this.remove();
      this.onScroll.emit();
    })
  }

  ngOnDestroy() {
    if (this.remove) this.remove();
  }
}
