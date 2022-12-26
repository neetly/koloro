import type { ColorCoords } from "./ColorCoords";
import { ColorSpace } from "./ColorSpace";
import { Oklch } from "./colorspaces/Oklch";

class Color {
  readonly colorspace: ColorSpace;
  readonly coords: ColorCoords;

  constructor(colorspace: string | ColorSpace, coords: ColorCoords) {
    this.colorspace = Color.getColorSpace(colorspace);
    this.coords = coords;
  }

  to(colorspace: string | ColorSpace) {
    return new Color(
      Color.getColorSpace(colorspace),
      ColorSpace.convert(
        this.colorspace,
        Color.getColorSpace(colorspace),
        this.coords,
      ),
    );
  }

  inGamut(colorspace?: string | ColorSpace): boolean {
    if (colorspace) {
      return this.to(colorspace).inGamut();
    }

    return this.colorspace.inGamut(this.coords);
  }

  toGamut(colorspace?: string | ColorSpace): Color {
    if (colorspace) {
      return this.to(colorspace).toGamut().to(this.colorspace);
    }

    if (this.inGamut()) {
      return this;
    }

    const [lightness, chroma, hue] = this.to(Oklch).coords;

    if (lightness > 1) {
      return new Color(Oklch, [1, 0, 0]).to(this.colorspace).toClipped();
    }
    if (lightness < 0) {
      return new Color(Oklch, [0, 0, 0]).to(this.colorspace).toClipped();
    }

    let minChroma = 0;
    let maxChroma = chroma;
    let bestColor = this.toClipped();

    while (maxChroma - minChroma >= 0.0001) {
      const chroma = (minChroma + maxChroma) / 2;
      bestColor = new Color(Oklch, [lightness, chroma, hue]) //
        .to(this.colorspace);

      if (bestColor.inGamut()) {
        minChroma = chroma;
      } else {
        maxChroma = chroma;
      }
    }

    return bestColor.toClipped();
  }

  toClipped() {
    return new Color(this.colorspace, this.colorspace.toClipped(this.coords));
  }

  toHex() {
    const color = this.to("srgb").toGamut();
    return (
      "#" +
      color.coords
        .map((value) => {
          return Math.round(value * 255)
            .toString(16)
            .padStart(2, "0");
        })
        .join("")
    );
  }

  static deltaE(color1: Color, color2: Color) {
    color1 = color1.to(Oklch);
    color2 = color2.to(Oklch);

    return Math.sqrt(
      (color1.coords[0] - color2.coords[0]) ** 2 +
        (color1.coords[1] - color2.coords[1]) ** 2 +
        (color1.coords[2] - color2.coords[2]) ** 2,
    );
  }

  static readonly colorspaces = new Map<string, ColorSpace>();

  static registerColorSpace(colorspace: ColorSpace) {
    this.colorspaces.set(colorspace.id, colorspace);
  }

  static getColorSpace(id: string | ColorSpace) {
    if (id instanceof ColorSpace) {
      return id;
    }
    const colorspace = this.colorspaces.get(id);
    if (!colorspace) {
      throw new Error(`Cannot find color space "${id}".`);
    }
    return colorspace;
  }
}

export { Color };
