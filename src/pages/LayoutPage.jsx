import { Outlet, useLocation, matchPath } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../tailwind-import.css'
import '../index.css'
import { AboutIntro } from "./Home";

export default function LayoutPage() {
  const location = useLocation();
  const isHome = matchPath("/:lang/", location.pathname) !== null;

  return (
    <>
    <div
        className="min-h-screen flex flex-col items-center text-center
        px-8 sm:px-10 md:px-16 lg:px-60 xl:px-60 2xl:px-80
        bg-[url(/texture/noise-tile.png)] bg-center bg-repeat"
    >
      <Header />

      <main className="w-full max-w-7xl flex-1 mt-0">
        <Outlet />
      </main>
      
    </div>
    { isHome && <AboutIntro />}
    <Footer />
    </>
  );
}