import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ViewChild } from '@angular/core';
import { ColorConverterService } from '../../services/color-converter.service';

@Component({
  selector: 'adr-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.css']
})
export class OpacitySliderComponent implements OnInit, OnChanges {

  @Input() hue: number;
  @Input() opacity: number;

  @Output('change') change = new EventEmitter<number>();

  @ViewChild('slider') slider;

  sliderBackgroundGradient: string;
  pointerX: number;

  constructor(private converter: ColorConverterService) {
    this.getSliderBackgroundGradient();
  }

  ngOnInit() {
    this.getPointerX();
  }

  ngOnChanges(changes) {
    if (changes['hue']) {
      this.onHueChange();
    }
    if (changes['opacity']) {
      this.onOpacityChange();
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

  onOpacityChange() {
    this.getPointerX();
  }

  getPointerX() {
    const sliderWidth = parseInt(window.getComputedStyle(this.slider.nativeElement).width, 10);
    this.pointerX = this.opacity * sliderWidth;
  }

  getSliderBackgroundGradient() {
    const gradientColor = '#' + this.converter.hsvToRgb({
      h: this.hue,
      s: 100,
      v: 100
    }, true);

    this.sliderBackgroundGradient = `linear-gradient(to right, transparent, ${gradientColor})`;
  }

}
