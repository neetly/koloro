import { Color } from "koloro";
import { useMemo } from "react";

import { ColorSlider } from "../ColorSlider";
import { ColorView } from "../ColorView";
import styles from "./ColorPicker.module.scss";

type ColorPickerProps = {
  color: Color;
  onColorChange: (color: Color) => void;
};

const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
  const [lightness, chroma, hue] = useMemo(() => {
    return color.to("koloro-lch").coords;
  }, [color]);

  const onLightnessChange = (lightness: number) => {
    onColorChange(new Color("koloro-lch", [lightness, chroma, hue]));
  };

  const onChromaChange = (chroma: number) => {
    onColorChange(new Color("koloro-lch", [lightness, chroma, hue]));
  };

  const onHueChange = (hue: number) => {
    onColorChange(new Color("koloro-lch", [lightness, chroma, hue]));
  };

  const lightnessColorStops = useMemo(() => {
    return getColorStops(
      new Color("koloro-lch", [0, chroma, hue]),
      new Color("koloro-lch", [100, chroma, hue]),
      10,
    );
  }, [chroma, hue]);

  const chromaColorStops = useMemo(() => {
    return getColorStops(
      new Color("koloro-lch", [lightness, 0, hue]),
      new Color("koloro-lch", [lightness, 100, hue]),
      10,
    );
  }, [lightness, hue]);

  const hueColorStops = useMemo(() => {
    return getColorStops(
      new Color("koloro-lch", [lightness, chroma, 0]),
      new Color("koloro-lch", [lightness, chroma, 360]),
      36,
    );
  }, [lightness, chroma]);

  const actualColor = useMemo(() => {
    const color = new Color("koloro-lch", [lightness, chroma, hue]);
    return color.toGamut({ space: "srgb" }) as Color;
  }, [lightness, chroma, hue]);

  const actualChroma = actualColor.coords[1];

  return (
    <div className={styles.container}>
      <ColorSlider
        label="Lightness"
        rule={{ min: 0, max: 100, step: 1 }}
        color={actualColor}
        colorStops={lightnessColorStops}
        value={lightness}
        valueText={formatNumber(lightness, "%")}
        onChange={onLightnessChange}
      />
      <ColorSlider
        label="Chroma"
        rule={{ min: 0, max: 100, step: 1 }}
        color={actualColor}
        colorStops={chromaColorStops}
        value={chroma}
        valueText={
          `(actual: ${formatNumber(actualChroma, "%")})  ` +
          formatNumber(chroma, "%")
        }
        onChange={onChromaChange}
      />
      <ColorSlider
        label="Hue"
        rule={{ min: 0, max: 360, step: 1 }}
        color={actualColor}
        colorStops={hueColorStops}
        value={hue}
        valueText={formatNumber(hue, "°")}
        onChange={onHueChange}
      />
      <ColorView color={actualColor} />
    </div>
  );
};

const formatNumber = (value: number, unit: string) => {
  return value.toFixed(0).padStart(3) + unit;
};

const getColorStops = (from: Color, to: Color, steps: number) => {
  return Color.steps(from, to, { steps, hue: "raw" }).map((color) => {
    return color.toGamut({ space: "srgb" }) as Color;
  });
};

export { type ColorPickerProps, ColorPicker };
