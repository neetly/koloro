import type { Color } from "koloro";

const cache = new WeakMap<Color, Color>();

const toColorGamut = (color: Color) => {
  let result = cache.get(color);
  if (result) {
    return result;
  }

  result = color.clone().toGamut({ space: "srgb" }) as Color;

  cache.set(color, result);
  return result;
};

export { toColorGamut };
