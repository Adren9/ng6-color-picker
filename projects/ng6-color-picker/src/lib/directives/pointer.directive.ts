import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[adrPointer]'
})
export class PointerDirective implements OnInit {

  // Element against which pointer position is calculated
  @Input('container') container;

  constructor(private pointer: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (! this.container) {
      throw new Error('Container element is not specified.');
    }

    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.pointer.nativeElement, 'position', 'absolute');
  }

}
