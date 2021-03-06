import { Component, OnInit, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';
import { ColorConverterService } from '../../services/color-converter.service';


@Component({
  selector: 'adr-sv-picker',
  templateUrl: './sv-picker.component.html',
  styleUrls: ['./sv-picker.component.css']
})
export class SvPickerComponent implements OnInit, OnChanges {

  @Input() hue: number;
  @Input() saturation: number;
  @Input() value: number;

  @Output('saturationChange') saturationChange = new EventEmitter<number>();
  @Output('valueChange') valueChange = new EventEmitter<number>();

  @ViewChild('picker') picker;

  pointerX: number;
  pointerY: number;
  pickerStyle;

  constructor(private converter: ColorConverterService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes['hue']) {
      this.getPickerStyle();
    }
    if (changes['saturation']) {
      this.getPointerX();
    }
    if (changes['value']) {
      this.getPointerY();
    }
  }

  onPointerPositionChange(position) {
    const saturation = position.x.percentage;
    const value = position.y.percentage;

    if (saturation !== this.saturation) {
      this.saturation = saturation;
      this.saturationChange.emit(saturation);
    }
    if (value !== this.value) {
      this.value = value;
      this.valueChange.emit(value);
    }
  }

  getPickerStyle() {
    const bgColor = this.converter.hsvToRgb({
      h: this.hue,
      s: 100,
      v: 100,
    }, true);

    this.pickerStyle = {
      backgroundColor: bgColor
    };
  }

  getPointerX() {
    const pickerWidth = parseInt(window.getComputedStyle(this.picker.nativeElement).width, 10);
    // Get x position in pixels for current saturation
    this.pointerX = this.saturation / 100 * pickerWidth;
  }

  getPointerY() {
    const pickerHeight = parseInt(window.getComputedStyle(this.picker.nativeElement).height, 10);
    // Get y position in pixels for current value
    this.pointerY = this.value / 100 * pickerHeight;
  }
}
