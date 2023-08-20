import { useEffect, useMemo } from "react";
import { Link, Outlet, ScrollRestoration, useMatches } from "react-router-dom";

import styles from "./App.module.scss";

interface Page {
  name: string;
  pathname: string;
}

const App = () => {
  const matches = useMatches();

  const pages = useMemo(() => {
    const pages: Page[] = [];
    for (const match of matches) {
      const name = getName(match.handle);
      if (name !== undefined) {
        pages.push({
          name,
          pathname: match.pathname,
        });
      }
    }
    return pages;
  }, [matches]);

  const currentPage = pages.at(-1);

  useEffect(() => {
    if (currentPage) {
      document.title = `${currentPage.name} - Koloro`;
    } else {
      document.title = `Koloro`;
    }
  }, [currentPage]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        <Link className={styles.link} to="/">
          Koloro
        </Link>

        {currentPage && (
          <>
            {" » "}
            <Link className={styles.link} to={currentPage.pathname}>
              {currentPage.name}
            </Link>
          </>
        )}
      </h1>

      <Outlet />

      <ScrollRestoration />
    </div>
  );
};

const getName = (handle: unknown) => {
  return (handle as { name?: string } | undefined)?.name;
};

export { App };
