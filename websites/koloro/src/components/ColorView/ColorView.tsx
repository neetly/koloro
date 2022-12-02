import type { Color } from "koloro";
import { useMemo } from "react";

import styles from "./ColorView.module.scss";

type ColorViewProps = {
  color: Color;
};

const ColorView = ({ color }: ColorViewProps) => {
  const value = useMemo(() => {
    return color.to("srgb").toString({ format: "hex", collapse: false });
  }, [color]);

  const onCopyButtonClick = () => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.preview} style={{ "--color": value }} />
      <div className={styles.value}>{value}</div>
      <button
        className={styles.copyButton}
        onClick={onCopyButtonClick}
        aria-label="Copy Color Value"
      >
        📋
      </button>
    </div>
  );
};

export { type ColorViewProps, ColorView };
