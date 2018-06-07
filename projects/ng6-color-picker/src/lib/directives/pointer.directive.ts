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

  // Pointer can't move in x-axis if true
  @Input() disableXAxis = false;

  // Pointer can't move in y-axis if true
  @Input() disableYAxis = false;

  @Output() positionChange = new EventEmitter();

  private dragging: boolean;

  constructor(private pointer: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (! this.container) {
      throw new Error('Container element is not specified.');
    }

    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.pointer.nativeElement, 'position', 'absolute');
    // prevent scrolling, refreshing page
    this.renderer.setStyle(this.container, 'touch-action', 'none');
    // set pointer undraggable
    this.renderer.setAttribute(this.pointer.nativeElement, 'draggable', 'false');
    this.renderer.setStyle(this.pointer.nativeElement, 'touch-action', 'none');
    this.renderer.setStyle(this.pointer.nativeElement, 'user-select', 'none');
    this.renderer.setStyle(this.pointer.nativeElement, 'user-drag', 'none');

    this.renderer.listen(this.container, 'mousedown', this.onContainerMouseDown.bind(this));
    this.renderer.listen(this.container, 'touchstart', this.onTouchStart.bind(this));
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

  onTouchStart(e: TouchEvent) {
    this.getTouchCoordinates(e);
    this.changePointerPosition();
    this.dragStart();
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp() {
    this.dragStop();
  }
  @HostListener('document:touchend')
  onDocumentTouchEnd() {
    this.dragStop();
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(e: MouseEvent) {
    // If mouse button is down
    if (this.dragging) {
      this.getMouseCoordinates(e);
      this.changePointerPosition();
    }
  }

  @HostListener('document:touchmove', ['$event'])
  onDocumentTouchMove(e: TouchEvent) {
    // If touched on container
    if (this.dragging) {
      this.getTouchCoordinates(e);
      this.changePointerPosition();
    }
  }

  dragStart() {
    this.dragging = true;
  }

  dragStop() {
    this.dragging = false;
  }

  getMouseCoordinates(e: MouseEvent) {
    // Distances from page start
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    this.getCoordinates(mouseX, mouseY);
  }

  getTouchCoordinates(e: TouchEvent) {
    // Distances from page start
    const touchX = e.touches[0].pageX;
    const touchY = e.touches[0].pageY;

    this.getCoordinates(touchX, touchY);
  }

  // Calculates distance in relation to container
  // x and y parameters should be distance from page start
  getCoordinates(x, y) {

    const containerX = this.container.offsetLeft;
    const containerY = this.container.offsetTop;

    const containerWidth = parseInt(window.getComputedStyle(this.container).width, 10);
    const containerHeight = parseInt(window.getComputedStyle(this.container).height, 10);

     x = x - containerX;
     y = y - containerY;

     // Invert y to be real value of y axis
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
      },
      y: {
        px: this.y,
        percentage: Math.round(y / containerHeight * 100)
      }
    });
  }
  changePointerPosition() {
    if (! this.disableXAxis) {
      this.changePointerXPosition();
    }
    if (! this.disableYAxis) {
      this.changePointerYPosition();
    }
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
