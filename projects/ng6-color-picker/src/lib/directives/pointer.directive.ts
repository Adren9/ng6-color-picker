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
    this.getMouseCoordinates(e);
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
    this.getMouseCoordinates(e);
  }

  // Calculates x and y values from event properties and container properties
  getMouseCoordinates(e: MouseEvent) {

    // Distances from page start
    const mouseLeft = e.pageX;
    const mouseTop = e.pageY;
    const containerLeft = this.container.offsetLeft;
    const containerTop = this.container.offsetTop;

    const containerWidth = parseInt(window.getComputedStyle(this.container).width, 10);
    const containerHeight = parseInt(window.getComputedStyle(this.container).height, 10);

    // Mouse positions against container
    let x = mouseLeft - containerLeft;
    let y = mouseTop - containerTop;

    // Invert y to be real value of y-axis
    y = containerHeight - y;

    // values can't be outside of the container
    if (x < 0) {
      x = 0;
    } else if (x > containerWidth) {
      x = containerWidth;
    }

    if (y < 0) {
      y = 0;
    } else if (y > containerHeight) {
      y = containerHeight;
    }

    this.x = x;
    this.y = y;
  }
}
