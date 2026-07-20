// import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from "./utils/ScrollToTop";
import RootRedirect from "./utils/RootRedirect";
import LayoutPage from "./pages/LayoutPage";
import LanguageWrapper from "./pages/LanguageWrapper";
import Home from "./pages/Home";
import Projets from "./pages/Projets"
import DetailProject from "./pages/DetailProject";
import About from "./pages/About";
import Contact from "./pages/Contact"


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Router>
    <ScrollToTop />
    <Routes>
      <Route element={<LayoutPage />}>
        {/* 1. If someone visits the root '/', redirect based on localStorage or default to 'fr' */}
        <Route path="/" element={<RootRedirect />} />
        {/* Language-prefixed routes */}
        <Route path="/:lang" element={<LanguageWrapper />} >
          <Route path="/:lang/" element={<Home />} />
          <Route path="/:lang/projets" element={<Projets />} />
          <Route path="/:lang/projets/:projetUrl" element={<DetailProject />} />
          <Route path="/:lang/about" element={<About />} />
          <Route path="/:lang/contact" element={<Contact />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<RootRedirect />} />
      </Route>
    </Routes>
  </Router>
)
