import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ColorConverterService } from '../../services/color-converter.service';

@Component({
  selector: 'adr-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.css']
})
export class OpacitySliderComponent implements OnInit, OnChanges {

  @Input() hue: number;

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
