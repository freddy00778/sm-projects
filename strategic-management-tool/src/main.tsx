import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./utils/Router.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
// import "react-tooltip/dist/react-tooltip.css";
import {store} from "./_store";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
