import { Color } from "koloro";
import { useEffect, useState } from "react";

import { ColorPicker } from "../../components/ColorPicker";
import { Storage } from "../../services/Storage";
import { Theme } from "../../services/Theme";
import styles from "./PickerPage.module.scss";

const PickerPage = () => {
  const [color, setColor] = useState(() => {
    return new Color("koloro-lch", [
      Storage.getItem("picker.lightness") ?? 50,
      Storage.getItem("picker.chroma") ?? 50,
      Theme.getHue(),
    ]);
  });

  const onColorChange = (color: Color) => {
    setColor(color.to("koloro-lch") as Color);
  };

  const [lightness, chroma, hue] = color.coords;

  useEffect(() => Storage.setItem("picker.lightness", lightness), [lightness]);
  useEffect(() => Storage.setItem("picker.chroma", chroma), [chroma]);
  useEffect(() => Theme.setHue(hue), [hue]);

  return (
    <main className={styles.page}>
      <ColorPicker color={color} onColorChange={onColorChange} />
    </main>
  );
};

export { PickerPage };
