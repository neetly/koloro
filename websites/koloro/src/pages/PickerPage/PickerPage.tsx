import { Color } from "koloro";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ColorSlider } from "../../components/ColorSlider";
import { ColorView } from "../../components/ColorView";
import styles from "./PickerPage.module.scss";

const PickerPage = () => {
  const [lightness, setLightness] = useState(80);
  const [chroma, setChroma] = useState(60);
  const [hue, setHue] = useState(0);

  const color = useMemo(() => {
    const color = new Color("koloro-lch", [lightness, chroma, hue]);
    return color.toGamut({ space: "srgb" }) as Color;
  }, [lightness, chroma, hue]);

  const actualChroma = color.coords[1];

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

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <Link className={styles.homeLink} to="/">
          Koloro
        </Link>
        {" » "}
        Color Picker
      </h1>
      <ColorSlider
        label="Lightness"
        formatValue={(lightness) => formatNumber(lightness, "%")}
        rule={{ min: 0, max: 100, step: 1 }}
        colorStops={lightnessColorStops}
        value={lightness}
        onChange={setLightness}
      />
      <ColorSlider
        label="Chroma"
        formatValue={(chroma) =>
          `(actual: ${formatNumber(actualChroma, "%")})  ` +
          formatNumber(chroma, "%")
        }
        rule={{ min: 0, max: 100, step: 1 }}
        colorStops={chromaColorStops}
        value={chroma}
        onChange={setChroma}
      />
      <ColorSlider
        label="Hue"
        formatValue={(hue) => formatNumber(hue, "°")}
        rule={{ min: 0, max: 360, step: 1 }}
        colorStops={hueColorStops}
        value={hue}
        onChange={setHue}
      />
      <section className={styles.colorSection}>
        <h1 className={styles.colorTitle}>Color</h1>
        <ColorView color={color} />
      </section>
    </main>
  );
};

const formatNumber = (value: number, unit: string) => {
  return value.toFixed(0).padStart(3) + unit;
};

const getColorStops = (from: Color, to: Color, steps: number) => {
  return Color.steps(from, to, { steps, hue: "raw" }).map(
    (color) => color.toGamut({ space: "srgb" }) as Color,
  );
};

export { PickerPage };
