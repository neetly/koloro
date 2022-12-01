import Color from "colorjs.io";

import {
  LAB_TO_LMS_MATRIX,
  LMS_TO_LAB_MATRIX,
  LMS_TO_XYZ_MATRIX,
  XYZ_TO_LMS_MATRIX,
} from "./matrices";

const KoloroLab = new Color.Space({
  id: "koloro-lab",
  name: "Koloro Lab",
  white: Color.WHITES.D65,
  coords: {
    l: { name: "L", refRange: [0, 1] },
    a: { name: "a", refRange: [-0.4, 0.4] },
    b: { name: "b", refRange: [-0.4, 0.4] },
  },

  base: Color.spaces["xyz-d65"],

  fromBase: (XYZ) => {
    let LMS = Color.util.multiplyMatrices(XYZ_TO_LMS_MATRIX, XYZ);

    const δ = 24 / 116;
    LMS = LMS.map((value) => {
      if (value > δ ** 3) {
        return Math.cbrt(value) * 1.16 - 0.16;
      } else {
        return (value / δ ** 3) * 0.08;
      }
    }) as [number, number, number];

    return Color.util.multiplyMatrices(LMS_TO_LAB_MATRIX, LMS);
  },

  toBase: (Lab) => {
    let LMS = Color.util.multiplyMatrices(LAB_TO_LMS_MATRIX, Lab);

    const δ = 24 / 116;
    LMS = LMS.map((value) => {
      if (value > 0.08) {
        return ((value + 0.16) / 1.16) ** 3;
      } else {
        return (value / 0.08) * δ ** 3;
      }
    }) as [number, number, number];

    return Color.util.multiplyMatrices(LMS_TO_XYZ_MATRIX, LMS);
  },
});

export { KoloroLab };
