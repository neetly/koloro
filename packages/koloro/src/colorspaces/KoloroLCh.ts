import { ColorSpace } from "../ColorSpace";
import { KoloroLab } from "./KoloroLab";

const KoloroLCh = new ColorSpace({
  id: "koloro-lch",

  base: KoloroLab,

  fromBase: ([L, a, b]) => {
    const C = Math.sqrt(a ** 2 + b ** 2);
    if (C < 0.025) {
      return [L, C, NaN];
    }

    const h = Math.atan2(b, a) * (180 / Math.PI);
    return [L, C, (h + 360) % 360];
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
