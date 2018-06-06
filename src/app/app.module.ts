import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng6ColorPickerModule } from 'ng6-color-picker';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng6ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
