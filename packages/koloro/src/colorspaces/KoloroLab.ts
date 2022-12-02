import Color from "colorjs.io";

const KoloroLab = new Color.Space({
  id: "koloro-lab",
  name: "Koloro Lab",
  white: Color.WHITES.D65,
  coords: {
    l: { name: "L", refRange: [0, 100] },
    a: { name: "a", refRange: [-100, 100] },
    b: { name: "b", refRange: [-100, 100] },
  },

  base: Color.spaces["oklab"],

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
