import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import OneMovie from "./pages/OneMovie";
import { ToastContainer } from "react-toastify";
import AddMovie from "./pages/AddMovie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/m/:id" element={<OneMovie />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="*" element={<h1>ERROR 404 - Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored" />
  </StrictMode>,
);
