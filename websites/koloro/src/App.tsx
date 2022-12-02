import { Outlet, ScrollRestoration } from "react-router-dom";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export { App };
