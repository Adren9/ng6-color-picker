import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'adr-hue-slider',
  templateUrl: './hue-slider.component.html',
  styleUrls: ['./hue-slider.component.css']
})
export class HueSliderComponent implements OnInit {

  @Input() hue: number;

  @Output('change') change = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPointerPositionChange(position) {
    const x = position.x.percentage;
    this.hue = Math.round(x / 100 * 360);
    this.change.emit(this.hue);
  }
}
