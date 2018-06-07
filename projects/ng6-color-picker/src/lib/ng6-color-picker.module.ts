import { NgModule } from '@angular/core';
import { Ng6ColorPickerComponent } from './ng6-color-picker.component';
import { SvPickerComponent } from './components/sv-picker/sv-picker.component';
import { HueSliderComponent } from './components/hue-slider/hue-slider.component';
import { OpacitySliderComponent } from './components/opacity-slider/opacity-slider.component';
import { PointerDirective } from './directives/pointer.directive';
import { ColorConverterService } from './services/color-converter.service';

@NgModule({
  imports: [
  ],
  providers: [
    ColorConverterService
  ],
  declarations: [Ng6ColorPickerComponent, SvPickerComponent, HueSliderComponent, OpacitySliderComponent, PointerDirective],
  exports: [Ng6ColorPickerComponent]
})
export class Ng6ColorPickerModule { }
