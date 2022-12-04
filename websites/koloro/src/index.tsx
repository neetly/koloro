import "./index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import { Theme } from "./services/Theme";

Theme.init();

const router = createBrowserRouter(routes);

const container = document.querySelector("#root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
