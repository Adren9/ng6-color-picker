import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ColorConverterService } from '../../services/color-converter.service';

@Component({
  selector: 'adr-hue-slider',
  templateUrl: './hue-slider.component.html',
  styleUrls: ['./hue-slider.component.css']
})
export class HueSliderComponent implements OnInit, OnChanges {

  @Input() hue = 0;

  @Output('change') change = new EventEmitter<number>();

  pointerStyle;

  constructor(private converter: ColorConverterService) {
    this.getPointerStyle();
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes['hue']) {
      this.onHueChange();
    }
  }

  onHueChange() {
    this.getPointerStyle();
  }

  onPointerPositionChange(position) {
    const x = position.x.percentage;
    this.hue = Math.round(x / 100 * 360);
    this.onHueChange();
    this.change.emit(this.hue);
  }

  getPointerStyle() {
    const bgColor = this.converter.hsvToRgb({
      h: this.hue,
      s: 100,
      v: 100
    }, true);

    this.pointerStyle = {
      backgroundColor: '#' + bgColor
    };
  }
}
