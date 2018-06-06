import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[adrPointer]'
})
export class PointerDirective implements OnInit {

  // Element against which pointer position is calculated
  @Input('container') container;

  constructor() { }

  ngOnInit() {
    if (! this.container) {
      throw new Error('Container element is not specified.');
    }
  }

}
