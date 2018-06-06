import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng6ColorPickerComponent } from './ng6-color-picker.component';

describe('Ng6ColorPickerComponent', () => {
  let component: Ng6ColorPickerComponent;
  let fixture: ComponentFixture<Ng6ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng6ColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng6ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
