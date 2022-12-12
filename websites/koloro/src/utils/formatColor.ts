import type { Color } from "koloro";

import { toColorGamut } from "./toColorGamut";

const cache = new WeakMap<Color, string>();

const formatColor = (color: Color) => {
  let result = cache.get(color);
  if (result) {
    return result;
  }

  result = toColorGamut(color)
    .to("srgb")
    .toString({ format: "hex", collapse: false });

  cache.set(color, result);
  return result;
};

export { formatColor };
