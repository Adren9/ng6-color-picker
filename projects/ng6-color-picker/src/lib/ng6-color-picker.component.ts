import { Component, OnInit } from '@angular/core';
import { RGB } from 'ng6-color-picker/lib/models/rgb';
import { HSV } from './models/hsv';
import { ColorConverterService } from './services/color-converter.service';

@Component({
  selector: 'adr-ng6-color-picker',
  templateUrl: './ng6-color-picker.component.html',
  styleUrls: ['./ng6-color-picker.component.css']
})
export class Ng6ColorPickerComponent implements OnInit {

  rgb: RGB;
  hsv: HSV = { h: 360, s: 100, v: 100 };
  opacity = 1;

  constructor(private converter: ColorConverterService) {
    this.updateRgb();
  }

  ngOnInit() {
  }

  private updateRgb() {
    this.rgb = <RGB>this.converter.hsvToRgb(this.hsv);
  }

  onHsvChange() {
    this.updateRgb();
  }

}
