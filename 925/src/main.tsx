import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Szamologep from "./pages/Szamologep";
import Penzvalto from "./pages/Penzvalto";
import Bmi from "./pages/Bmi";
import Homerseklet from "./pages/Homerseklet";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/szamologep" element={<Szamologep />} />
        <Route path="/penzvalto" element={<Penzvalto />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/homerseklet" element={<Homerseklet />} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
