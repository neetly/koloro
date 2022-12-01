import Color from "colorjs.io";

import { KoloroLab } from "./KoloroLab";

const KoloroLCh = new Color.Space({
  id: "koloro-lch",
  name: "Koloro LCh",
  white: Color.WHITES.D65,
  coords: {
    l: { name: "L", refRange: [0, 1] },
    c: { name: "C", refRange: [0, 0.4] },
    h: { name: "h", type: "angle", refRange: [0, 360] },
  },

  base: KoloroLab,

  fromBase: ([L, a, b]) => {
    const C = Math.sqrt(a ** 2 + b ** 2);

    const ε = 0.0001;
    if (Math.abs(a) < ε && Math.abs(b) < ε) {
      return [L, C, 0];
    }

    const h = (Math.atan2(b, a) * (180 / Math.PI) + 360) % 360;
    return [L, C, h];
  },

  toBase: ([L, C, h]) => {
    if (Number.isNaN(h)) {
      return [L, 0, 0];
    }

    const a = C * Math.cos(h * (Math.PI / 180));
    const b = C * Math.sin(h * (Math.PI / 180));
    return [L, a, b];
  },
});

export { KoloroLCh };
