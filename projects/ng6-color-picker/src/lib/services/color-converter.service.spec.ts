import { TestBed, inject } from '@angular/core/testing';

import { ColorConverterService } from './color-converter.service';

describe('ColorConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorConverterService]
    });
  });

  it('should be created', inject([ColorConverterService], (service: ColorConverterService) => {
    expect(service).toBeTruthy();
  }));
});
