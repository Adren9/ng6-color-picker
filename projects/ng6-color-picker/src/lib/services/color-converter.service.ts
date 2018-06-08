import { Injectable } from '@angular/core';
import { HSV } from '../models/hsv';
import { RGB } from '../models/rgb';

@Injectable()
export class ColorConverterService {

  constructor() { }

  hsvToRgb(hsv: HSV, hex = false) {
    const h = hsv.h,
          s = hsv.s / 100,
          v = hsv.v / 100;

    const c = v * s;

    const h1 = h / 60;

    const x = c * (1 - Math.abs(h1 % 2 - 1));

    let r1, g1, b1;

    switch (Math.floor(h1)) {
      case 0:
        r1 = c; g1 = x; b1 = 0;
        break;
      case 1:
        r1 = x; g1 = c; b1 = 0;
        break;
      case 2:
        r1 = 0; g1 = c; b1 = x;
        break;
      case 3:
        r1 = 0; g1 = x; b1 = c;
        break;
      case 4:
        r1 = x; g1 = 0; b1 = c;
        break;
      case 5:
        r1 = c; g1 = 0; b1 = x;
        break;
      case 6:
        r1 = c; g1 = 0; b1 = x;
        break;
    }

    const m = v - c;

    const rgb = {
      r: Math.round((r1 + m) * 255),
      g: Math.round((g1 + m) * 255),
      b: Math.round((b1 + m) * 255)
    };

    if (hex) {
      return this.rgbToHex(rgb);
    }

    return rgb;
  }

  rgbToHsv(rgb: RGB) {
    const r = rgb.r / 255,
          g = rgb.g / 255,
          b = rgb.b / 255;

    const v = Math.max(r, g, b);

    const diff = v - Math.min(r, g, b);
    const diffc = (c) => {
      return (v - c) / 6 / diff + 1 / 2;
    };

    let h, s, rr, gg, bb;

    if (diff === 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
        h = bb - gg;
      } else if (g === v) {
        h = (1 / 3) + rr - bb;
      } else if (b === v) {
        h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }

  rgbToHex(rgb: RGB) {
    let r = rgb.r.toString(16),
        g = rgb.g.toString(16),
        b = rgb.b.toString(16);

    r = r.length === 1 ? '0' + r : r;
    g = g.length === 1 ? '0' + g : g;
    b = b.length === 1 ? '0' + b : b;

    return '#' + r + g + b;
  }

  hexToRgb(hex: string) {
    const r16 = hex.slice(1, 3);
    const g16 = hex.slice(3, 5);
    const b16 = hex.slice(5, 7);

    return {
      r: parseInt(r16, 16),
      g: parseInt(g16, 16),
      b: parseInt(b16, 16)
    };

  }
}
