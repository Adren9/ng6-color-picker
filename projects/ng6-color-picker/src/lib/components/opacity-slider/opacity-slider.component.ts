import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ColorConverterService } from '../../services/color-converter.service';

@Component({
  selector: 'adr-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.css']
})
export class OpacitySliderComponent implements OnInit, OnChanges {

  @Input() hue: number;
  @Input() opacity: number = 0.4;

  @Output('change') change = new EventEmitter<number>();

  sliderBackgroundGradient: string;

  constructor(private converter: ColorConverterService) {
    this.getSliderBackgroundGradient();
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes['hue']) {
      this.onHueChange();
    }
  }

  onPointerPositionChange(position) {
    const x = position.x.percentage;
    this.opacity = x / 100;

    this.change.emit(this.opacity);
  }

  onHueChange() {
    this.getSliderBackgroundGradient();
  }

  getSliderBackgroundGradient() {
    const gradientColor = '#' + this.converter.hsvToRgb({
      h: this.hue,
      s: 100,
      v: 100
    }, true);

    this.sliderBackgroundGradient = `linear-gradient(to right, transparent, ${gradientColor})`;
    console.log(this.sliderBackgroundGradient);
  }

}
