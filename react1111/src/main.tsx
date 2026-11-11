import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OneMovie from "./pages/OneMovie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<OneMovie />}></Route>
        <Route path="/*" element={<h1>Error 404 - Page not found!</h1>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
