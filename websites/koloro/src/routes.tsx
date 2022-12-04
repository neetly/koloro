import { createRoutesFromElements, Route } from "react-router-dom";

import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { PickerPage } from "./pages/PickerPage";

const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/picker"
      element={<PickerPage />}
      handle={{ name: "Color Picker" }}
    />
  </Route>,
);

export { routes };
