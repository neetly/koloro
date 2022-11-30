import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.querySelector("#root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <div />
    </StrictMode>,
  );
}
