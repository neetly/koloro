import Color from "colorjs.io";

import { KoloroLab } from "../colorspaces/KoloroLab";

const deltaEKoloro = (color: Color, sample: Color) => {
  return Color.distance(color, sample, KoloroLab);
};

export { deltaEKoloro };
