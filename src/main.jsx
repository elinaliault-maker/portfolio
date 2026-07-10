// import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Router>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route element={<LayoutArticle />}>
        <Route path="intro" element={<Intro />} />
        <Route path="depart" element={<Depart />} />
      </Route> */}
    </Routes>
  </Router>
)
