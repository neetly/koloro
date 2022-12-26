import { Color } from "./Color";
import { KoloroLab } from "./colorspaces/KoloroLab";
import { KoloroLCh } from "./colorspaces/KoloroLch";
import { Oklab } from "./colorspaces/Oklab";
import { Oklch } from "./colorspaces/Oklch";
import { sRGB } from "./colorspaces/sRGB";
import { sRGBLinear } from "./colorspaces/sRGBLinear";

Color.registerColorSpace(sRGB);
Color.registerColorSpace(sRGBLinear);
Color.registerColorSpace(Oklab);
Color.registerColorSpace(Oklch);
Color.registerColorSpace(KoloroLab);
Color.registerColorSpace(KoloroLCh);

export * from "./Color";
export * from "./ColorCoords";
export * from "./ColorSpace";
export * from "./colorspaces/KoloroLab";
export * from "./colorspaces/KoloroLch";
export * from "./colorspaces/Oklab";
export * from "./colorspaces/Oklch";
export * from "./colorspaces/sRGB";
export * from "./colorspaces/sRGBLinear";
