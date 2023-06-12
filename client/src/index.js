import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/fonts.css";
import "./styles/global.css";
import { SearchProvider } from "./contexts/searchContext";
import { AuthProvider } from "./contexts/authContext";
import { UiProvider } from "./contexts/UiContext";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <SearchProvider>
      <UiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UiProvider>
    </SearchProvider>
  </AuthProvider>,
  document.getElementById("root")
);
