// import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from "./utils/ScrollToTop";
import LayoutPage from "./pages/LayoutPage";
import Home from "./pages/Home";
import Projets from "./pages/Projets"
import DetailProject from "./pages/DetailProject";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Router>
    <ScrollToTop />
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route element={<LayoutPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/projets/:projetUrl" element={<DetailProject />} />
      </Route>
    </Routes>
  </Router>
)
