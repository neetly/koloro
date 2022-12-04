import type { Color } from "koloro";

const cache = new WeakMap<Color, string>();

const formatColor = (color: Color) => {
  let result = cache.get(color);
  if (result) {
    return result;
  }

  result = color.to("srgb").toString({
    format: "hex",
    collapse: false,
  });

  cache.set(color, result);
  return result;
};

export { formatColor };
