import type { ColorCoords } from "./ColorCoords";

type ColorSpaceSpec = {
  id: string;
  inGamut?: (coords: ColorCoords) => boolean;
  toClipped?: (coords: ColorCoords) => ColorCoords;
  base?: ColorSpace;
  fromBase?: (coords: ColorCoords) => ColorCoords;
  toBase?: (coords: ColorCoords) => ColorCoords;
};

class ColorSpace {
  readonly id: string;
  readonly inGamut: (coords: ColorCoords) => boolean;
  readonly toClipped: (coords: ColorCoords) => ColorCoords;
  readonly base?: ColorSpace;
  readonly fromBase?: (coords: ColorCoords) => ColorCoords;
  readonly toBase?: (coords: ColorCoords) => ColorCoords;

  readonly path: ColorSpace[];

  constructor({
    id,
    inGamut = () => true,
    toClipped = (coords) => coords,
    base,
    fromBase,
    toBase,
  }: ColorSpaceSpec) {
    this.id = id;
    this.inGamut = inGamut;
    this.toClipped = toClipped;
    this.base = base;
    this.fromBase = fromBase;
    this.toBase = toBase;

    this.path = [this];
    while (this.path[0]?.base) {
      this.path.unshift(this.path[0].base);
    }
  }

  static convert(from: ColorSpace, to: ColorSpace, coords: ColorCoords) {
    let ancestorIndex = -1;
    for (
      let index = 0;
      index < from.path.length && index < to.path.length;
      index++
    ) {
      if (from.path[index] !== to.path[index]) {
        break;
      }
      ancestorIndex = index;
    }

    if (ancestorIndex === -1) {
      throw new Error(
        `Cannot convert color from colorspace "${from.id}" to colorspace "${to.id}".`,
      );
    }

    for (let index = from.path.length - 1; index > ancestorIndex; index--) {
      coords = from.path[index]!.toBase!(coords); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
    for (let index = ancestorIndex + 1; index < to.path.length; index++) {
      coords = to.path[index]!.fromBase!(coords); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }

    return coords;
  }
}

export { type ColorSpaceSpec, ColorSpace };
