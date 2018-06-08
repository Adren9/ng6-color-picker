import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffers, DoCheck } from '@angular/core';
import { RGB } from './models/rgb';
import { HSV } from './models/hsv';
import { ColorConverterService } from './services/color-converter.service';

@Component({
  selector: 'adr-ng6-color-picker',
  templateUrl: './ng6-color-picker.component.html',
  styleUrls: ['./ng6-color-picker.component.css']
})
export class Ng6ColorPickerComponent implements OnInit, DoCheck {

  rgb: RGB;
  hsv: HSV;
  hex: string;
  opacity = 1;

  @Input() color: RGB | HSV | string;

  @Output('change') change = new EventEmitter();

  private colorDiffer;

  constructor(private converter: ColorConverterService, private differs: KeyValueDiffers) { }

  ngOnInit() {
    if (!this.color) {
      this.color = { h: 360, s: 100, v: 100};
    }
    this.colorDiffer = this.differs.find(this.color).create();
  }

  onColorInputChange() {
    if (!this.getInputColor()) {
      this.hsv = { h: 360, s: 100, v: 100 };
      this.onHsvChange();
    }
  }

  ngDoCheck() {
    const colorChanges = this.colorDiffer.diff(this.color);
    if (colorChanges) {
      this.onColorInputChange();
    }
  }

  getInputColor() {
    if (! this.color) {
      return false;
    }
    if (typeof this.color === 'string') {
      this.hex = this.color;
      this.onHexChange();
      return true;
    }
    if (Object.keys(this.color).toString() === ['r', 'g', 'b'].toString()) {
      this.rgb = this.color as RGB;
      this.onRgbChange();
      return true;
    }
    if (Object.keys(this.color).toString() === ['h', 's', 'v'].toString()) {
      this.hsv = this.color as HSV;
      this.onHsvChange();
      return true;
    }

    return false;
  }

  onHsvChange() {
    this.rgb = this.converter.hsvToRgb(this.hsv) as RGB;
    this.hex = this.converter.rgbToHex(this.rgb);
    this.onColorChange();
  }

  onRgbChange() {
    this.hex = this.converter.rgbToHex(this.rgb);
    this.hsv = this.converter.rgbToHsv(this.rgb);
    this.onColorChange();
  }

  onHexChange() {
    this.rgb = this.converter.hexToRgb(this.hex);
    this.hsv = this.converter.rgbToHsv(this.rgb);
    this.onColorChange();
  }

  onColorChange() {
    this.change.emit({
      rgb: this.rgb,
      hsv: this.hsv,
      hex: this.hex,
      opacity: this.opacity
    });
  }
}
