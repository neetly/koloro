import type { Color } from "koloro";
import { type ReactNode, useId } from "react";

import styles from "./ColorSlider.module.scss";

interface ColorSliderProps {
  label: ReactNode;
  rule: { min: number; max: number; step: number };
  color: Color;
  colorStops: readonly Color[];
  value: number;
  valueText: ReactNode;
  onChange: (value: number) => void;
}

const ColorSlider = ({
  label,
  rule,
  color,
  colorStops,
  value,
  valueText,
  onChange,
}: ColorSliderProps) => {
  const id = useId();

  const colorValue = color.toHex();
  const colorStopsValue = colorStops.map((color) => color.toHex()).join(",");

  return (
    <div
      className={styles.container}
      style={{
        "--color": colorValue,
        "--color-stops": colorStopsValue,
      }}
    >
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <output className={styles.value} htmlFor={id}>
        {valueText}
      </output>
      <div className={styles.sliderContainer}>
        <input
          className={styles.slider}
          id={id}
          type="range"
          {...rule}
          value={value}
          onChange={(event) => {
            onChange(Number(event.target.value));
          }}
        />
      </div>
    </div>
  );
};

export { ColorSlider, type ColorSliderProps };
