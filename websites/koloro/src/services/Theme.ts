import { Color } from "koloro";

import { formatColor } from "../utils/formatColor";
import { Storage } from "./Storage";

const Theme = {
  init: () => {
    Theme.setHue(Theme.getHue());
  },

  getHue: () => {
    return Storage.getItem<number>("theme.hue") ?? 0;
  },

  setHue: (hue: number) => {
    const colors: Record<string, [number, number, number]> = {
      "--color-background": [99, 1, hue],
      "--color-primary": [50, 60, hue],
    };

    for (const [name, [lightness, chroma, hue]] of Object.entries(colors)) {
      document.documentElement.style.setProperty(
        name,
        formatColor(new Color("koloro-lch", [lightness, chroma, hue])),
      );
    }

    Storage.setItem("theme.hue", hue);
  },
};

export { Theme };
