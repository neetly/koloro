import Color from "colorjs.io";

const KoloroLab = new Color.Space({
  id: "koloro-lab",
  name: "Koloro Lab",
  white: Color.WHITES.D65,
  coords: {
    l: { name: "L", refRange: [0, 1] },
    a: { name: "a", refRange: [-0.4, 0.4] },
    b: { name: "b", refRange: [-0.4, 0.4] },
  },

  base: Color.spaces["oklab"],

  fromBase: ([L, a, b]) => {
    const δ = 24 / 116;
    if (L > δ) {
      L = L * 1.16 - 0.16;
    } else {
      L = (L / δ) ** 3 * 0.08;
    }
    return [L, a, b];
  },

  toBase: ([L, a, b]) => {
    const δ = 24 / 116;
    if (L > 0.08) {
      L = (L + 0.16) / 1.16;
    } else {
      L = Math.cbrt(L / 0.08) * δ;
    }
    return [L, a, b];
  },
});

export { KoloroLab };
