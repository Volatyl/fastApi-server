import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { PersonProvider } from "./components/context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PersonProvider>
      <App />
    </PersonProvider>
  </React.StrictMode>
);
