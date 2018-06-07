import { Directive, Input, OnInit, ElementRef, Renderer2, HostListener, Output, EventEmitter, OnChanges } from '@angular/core';


@Directive({
  selector: '[adrPointer]'
})
export class PointerDirective implements OnInit, OnChanges {

  // Element against which pointer position is calculated
  @Input('container') container;

  // Pointer position of x-axis
  @Input() x: number;

  // Pointer position of y-axis
  @Input() y: number;

  @Output() positionChange = new EventEmitter();

  private dragging: boolean;

  constructor(private pointer: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (! this.container) {
      throw new Error('Container element is not specified.');
    }

    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.pointer.nativeElement, 'position', 'absolute');
    this.renderer.listen(this.container, 'mousedown', this.onContainerMouseDown.bind(this));
  }

  ngOnChanges() {
    // On input changes
    this.changePointerPosition();
  }

  onContainerMouseDown(e: MouseEvent) {
    this.getMouseCoordinates(e);
    this.changePointerPosition();
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
    this.changePointerPosition();
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

    this.positionChange.emit({
      x: {
        px: this.x,
        percentage: Math.round(x / containerWidth * 100)
      }
      y: {
        px: this.y,
        percentage: Math.round(y / containerHeight * 100)
      }
    });
  }

  changePointerPosition() {
    this.changePointerXPosition();
    this.changePointerYPosition();
  }

  changePointerXPosition() {
    const containerWidth = parseInt(window.getComputedStyle(this.container).width, 10);
    const pointerWidth = parseInt(window.getComputedStyle(this.pointer.nativeElement).width, 10);

    // centered (mouse cursor is in the middle of pointer)
    let pointerLeft = this.x - pointerWidth / 2;

    // percentage value
    pointerLeft = (pointerLeft / containerWidth) * 100;

    this.renderer.setStyle(this.pointer.nativeElement, 'left', pointerLeft + '%');
  }

  changePointerYPosition() {
    const containerHeight = parseInt(window.getComputedStyle(this.container).height, 10);
    const pointerHeight = parseInt(window.getComputedStyle(this.pointer.nativeElement).height, 10);

    // centered (mouse cursor is in the middle of pointer)
    let pointerBottom = this.y - pointerHeight / 2;

    // percentage value
    pointerBottom = (pointerBottom / containerHeight) * 100;

    this.renderer.setStyle(this.pointer.nativeElement, 'bottom', pointerBottom + '%');
  }
}
