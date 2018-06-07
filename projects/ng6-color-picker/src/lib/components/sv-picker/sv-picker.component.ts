import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ColorConverterService } from '../../services/color-converter.service';


@Component({
  selector: 'adr-sv-picker',
  templateUrl: './sv-picker.component.html',
  styleUrls: ['./sv-picker.component.css']
})
export class SvPickerComponent implements OnInit {

  @Input() hue: number;
  @Input() saturation: number;
  @Input() value: number;

  @Output('saturationChange') saturationChange = new EventEmitter<number>();
  @Output('valueChange') valueChange = new EventEmitter<number>();

  constructor(private converter: ColorConverterService) { }

  ngOnInit() {
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

    console.log(saturation, value);
  }

  getPickerStyle() {
    const bgColor = this.converter.hsvToRgb({
      h: this.hue,
      s: 100,
      v: 100,
    }, true);

    return {
      backgroundColor: '#' + bgColor
    };
  }
}
