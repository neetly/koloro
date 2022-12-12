import Color from "colorjs.io";

import { KoloroLab } from "./colorspaces/KoloroLab";
import { KoloroLCh } from "./colorspaces/KoloroLch";
import { deltaEKoloro } from "./deltaE/deltaEKoloro";

Color.Space.register(KoloroLab);
Color.Space.register(KoloroLCh);

Color.defineFunctions({ deltaEKoloro });

Color.defaults.gamut_mapping = "koloro-lch.c";
Color.defaults.interpolationSpace = "koloro-lch";

export { Color };
