import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

createRoot(
  document.getElementById("root") || document.getElementById("div")
).render(
  <Provider store={store}>
    <BrowserRouter>
      <App testingValue={null} />
    </BrowserRouter>
  </Provider>
);
