import { Color } from "koloro";
import { useEffect, useState } from "react";

import { ColorPicker } from "../../components/ColorPicker";
import { ColorView } from "../../components/ColorView";
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

  const [lightness, chroma, hue] = color.coords;

  useEffect(() => {
    Storage.setItem("picker.lightness", lightness);
  }, [lightness]);
  useEffect(() => {
    Storage.setItem("picker.chroma", chroma);
  }, [chroma]);
  useEffect(() => {
    Theme.setHue(hue);
  }, [hue]);

  return (
    <main className={styles.page}>
      <ColorPicker color={color} onColorChange={setColor} />
      <ColorView color={color} />
    </main>
  );
};

export { PickerPage };
