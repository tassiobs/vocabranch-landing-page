import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@/react-app/index.css";
import App from "@/react-app/App.tsx";

const rootEl = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
