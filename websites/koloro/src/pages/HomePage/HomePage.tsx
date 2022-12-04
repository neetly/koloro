import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

const HomePage = () => {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link className={styles.navLink} to="/picker">
          Color Picker
        </Link>
      </nav>
    </main>
  );
};

export { HomePage };
