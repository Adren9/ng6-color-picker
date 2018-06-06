import { NgModule } from '@angular/core';
import { Ng6ColorPickerComponent } from './ng6-color-picker.component';
import { SvPickerComponent } from './components/sv-picker/sv-picker.component';
import { HueSliderComponent } from './components/hue-slider/hue-slider.component';
import { OpacitySliderComponent } from './components/opacity-slider/opacity-slider.component';

@NgModule({
  imports: [
  ],
  declarations: [Ng6ColorPickerComponent, SvPickerComponent, HueSliderComponent, OpacitySliderComponent],
  exports: [Ng6ColorPickerComponent]
})
export class Ng6ColorPickerModule { }
