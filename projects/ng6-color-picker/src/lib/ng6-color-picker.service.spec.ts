import { TestBed, inject } from '@angular/core/testing';

import { Ng6ColorPickerService } from './ng6-color-picker.service';

describe('Ng6ColorPickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ng6ColorPickerService]
    });
  });

  it('should be created', inject([Ng6ColorPickerService], (service: Ng6ColorPickerService) => {
    expect(service).toBeTruthy();
  }));
});
