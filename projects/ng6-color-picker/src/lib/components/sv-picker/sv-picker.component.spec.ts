import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvPickerComponent } from './sv-picker.component';

describe('SvPickerComponent', () => {
  let component: SvPickerComponent;
  let fixture: ComponentFixture<SvPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
