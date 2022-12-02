import type { Color } from "koloro";
import type { ReactNode } from "react";
import { useId, useMemo } from "react";

import styles from "./ColorSlider.module.scss";

type ColorSliderProps = {
  label: ReactNode;
  formatValue: (value: number) => ReactNode;
  rule: { min: number; max: number; step: number };
  colorStops: readonly Color[];
  value: number;
  onChange: (value: number) => void;
};

const ColorSlider = ({
  label,
  formatValue,
  rule,
  colorStops,
  value,
  onChange,
}: ColorSliderProps) => {
  const id = useId();

  const colorStopsValue = useMemo(() => {
    return colorStops
      .map((color) => color.to("srgb").toString({ format: "hex" }))
      .join(",");
  }, [colorStops]);

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <output className={styles.value} htmlFor={id}>
        {formatValue(value)}
      </output>
      <input
        className={styles.slider}
        style={{ "--color-stops": colorStopsValue }}
        id={id}
        type="range"
        {...rule}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
};

export { type ColorSliderProps, ColorSlider };
