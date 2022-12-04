import type { Color } from "koloro";

import { formatColor } from "../../utils/formatColor";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./ColorView.module.scss";

type ColorViewProps = {
  color: Color;
};

const ColorView = ({ color }: ColorViewProps) => {
  const value = formatColor(color);

  const onCopyButtonClick = () => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <div className={styles.container} style={{ "--color": value }}>
      <div className={styles.preview} />
      <div className={styles.value}>{value}</div>
      <button className={styles.copyButton} onClick={onCopyButtonClick}>
        📋 <VisuallyHidden>Copy Color Value</VisuallyHidden>
      </button>
    </div>
  );
};

export { type ColorViewProps, ColorView };
