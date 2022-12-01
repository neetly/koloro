import Color from "colorjs.io";

import { KoloroLab } from "./colorspaces/KoloroLab";
import { KoloroLCh } from "./colorspaces/KoloroLch";

Color.Space.register(KoloroLab);
Color.Space.register(KoloroLCh);
