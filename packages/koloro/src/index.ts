import Color from "colorjs.io";
import type { DefineFunctionHybrid } from "colorjs.io/types/src/color";

import { KoloroLab } from "./colorspaces/KoloroLab";
import { KoloroLCh } from "./colorspaces/KoloroLch";
import { deltaEKoloro } from "./deltaE/deltaEKoloro";

Color.Space.register(KoloroLab);
Color.Space.register(KoloroLCh);

Color.defineFunctions({
  deltaEKoloro: deltaEKoloro as unknown as DefineFunctionHybrid,
});

Color.defaults.gamut_mapping = "koloro-lch.c";
Color.defaults.interpolationSpace = "koloro-lch";

export { Color };
