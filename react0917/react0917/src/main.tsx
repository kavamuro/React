import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Szamologep from "./pages/szamologep.tsx";
import Bmi from "./pages/bmi.tsx";
import Penzvalto from "./pages/penzvalto.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Penzvalto />
  </StrictMode>,
);
