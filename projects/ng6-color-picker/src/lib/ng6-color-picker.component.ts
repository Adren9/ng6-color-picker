import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffers, DoCheck, KeyValueDiffer, OnChanges } from '@angular/core';
import { RGB } from './models/rgb';
import { HSV } from './models/hsv';
import { ColorConverterService } from './services/color-converter.service';

@Component({
  selector: 'adr-ng6-color-picker',
  templateUrl: './ng6-color-picker.component.html',
  styleUrls: ['./ng6-color-picker.component.css']
})
export class Ng6ColorPickerComponent implements OnInit, OnChanges {

  hsv: HSV;

  @Input() opacity = 1;

  @Input() color = '#ff0000';

  @Input() enableOpacity = true;

  @Output('change') change = new EventEmitter();

  constructor(private converter: ColorConverterService) { }

  ngOnInit() {
    this.getHsvFromColorInput();
  }

  ngOnChanges(changes) {
    if (changes['color'] && this.hsv) {
     // hexadecimal color value may have different hsv color values (prevent pointer from getting away)
     const currentHex = this.converter.hsvToRgb(this.hsv, true);
      if (this.color !== currentHex) {
        this.getHsvFromColorInput();
      }
    }
  }

  getHsvFromColorInput() {
    const rgb = this.converter.hexToRgb(this.color);
    this.hsv = this.converter.rgbToHsv(rgb);
  }

  onHueChange(hue) {
    this.hsv.h = hue;
    this.emitChange();
  }

  onSaturationChange(saturataion) {
    this.hsv.s = saturataion;
    this.emitChange();
  }

  onValueChange(value) {
    this.hsv.v = value;
    this.emitChange();
  }

  onOpacityChange(opacity) {
    this.opacity = opacity;
    this.emitChange();
  }

  emitChange() {
    const rgb = this.converter.hsvToRgb(this.hsv) as RGB;
    const hex = this.converter.rgbToHex(rgb);
    const opacity = this.opacity;

    const event = {
      rgb: rgb,
      hsv: this.hsv,
      hex: hex,
      getCssRGB: () => {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      }
    };

    if (this.enableOpacity) {
      event['opacity'] = opacity;
      event['getCssRGBA'] = () => {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
      };
    }

    this.change.emit(event);
  }
}
