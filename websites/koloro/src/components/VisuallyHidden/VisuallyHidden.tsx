import type { ReactNode } from "react";

import styles from "./VisuallyHidden.module.scss";

type VisuallyHiddenProps = {
  children?: ReactNode;
};

const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return <span className={styles.visuallyHidden}>{children}</span>;
};

export { VisuallyHidden, type VisuallyHiddenProps };
