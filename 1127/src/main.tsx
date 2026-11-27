import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavBar from "./helpers/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import AddPizza from "./pages/AddPizza";
import OnePizza from "./pages/OnePizza";
import PutPizza from "./pages/PutPizza";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPizza />} />
        <Route path="/pizza/:id" element={<OnePizza />} />
        <Route path="/put/:id" element={<PutPizza />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored"></ToastContainer>
  </StrictMode>,
);
