import { ColorSpace } from "../ColorSpace";
import { Oklab } from "./Oklab";

const KoloroLab = new ColorSpace({
  id: "koloro-lab",

  base: Oklab,

  fromBase: ([L, a, b]) => {
    const δ = 24 / 116;
    if (L > δ) {
      L = L * 116 - 16;
    } else {
      L = (L / δ) ** 3 * 8;
    }
    return [L, a * 250, b * 250];
  },

  toBase: ([L, a, b]) => {
    const δ = 24 / 116;
    if (L > 8) {
      L = (L + 16) / 116;
    } else {
      L = Math.cbrt(L / 8) * δ;
    }
    return [L, a / 250, b / 250];
  },
});

export { KoloroLab };
