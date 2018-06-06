import { Directive, Input, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[adrPointer]'
})
export class PointerDirective implements OnInit {

  // Element against which pointer position is calculated
  @Input('container') container;

  // Pointer position of x-axis
  @Input() x: number;

  // Pointer position of y-axis
  @Input() y: number;

  private dragging: boolean;

  constructor(private pointer: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (! this.container) {
      throw new Error('Container element is not specified.');
    }

    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.pointer.nativeElement, 'position', 'absolute');
    this.renderer.listen(this.container, 'mousedown', this.onContainerMouseDown);

  }

  onContainerMouseDown(e: MouseEvent) {
    this.dragStart();
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp() {
    this.dragStop();
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(e: MouseEvent) {
    // If mouse button is down
    if (this.dragging) {
      this.onPointerDrag(e);
    }
  }

  dragStart() {
    this.dragging = true;
  }

  dragStop() {
    this.dragging = false;
  }

  onPointerDrag(e: MouseEvent) {

  }
}
