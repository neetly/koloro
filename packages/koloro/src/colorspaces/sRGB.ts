import type { ColorCoords } from "../ColorCoords";
import { ColorSpace } from "../ColorSpace";
import { clamp } from "../utils/clamp";
import { sRGBLinear } from "./sRGBLinear";

const sRGB = new ColorSpace({
  id: "srgb",

  inGamut: (RGB) => {
    return RGB.every((value) => {
      return value >= 0 && value <= 1;
    });
  },

  toClipped: (RGB) => {
    return RGB.map((value) => {
      return clamp(value, 0, 1);
    }) as unknown as ColorCoords;
  },

  base: sRGBLinear,

  fromBase: (RGB) => {
    return RGB.map((value) => {
      const sign = Math.sign(value);
      const abs = Math.abs(value);

      if (abs <= 0.0031308) {
        return 12.92 * value;
      }

      return sign * (1.055 * abs ** (1 / 2.4) - 0.055);
    }) as unknown as ColorCoords;
  },

  toBase: (RGB) => {
    return RGB.map((value) => {
      const sign = Math.sign(value);
      const abs = Math.abs(value);

      if (abs <= 0.04045) {
        return value / 12.92;
      }

      return sign * ((abs + 0.055) / 1.055) ** 2.4;
    }) as unknown as ColorCoords;
  },
});

export { sRGB };
