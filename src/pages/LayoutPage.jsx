import { Outlet, useMatch } from "react-router";
import Header from "../components/Header";
import SectionTop from "../components/SectionTop";
import '../tailwind-import.css'
import '../index.css'

export default function LayoutPage() {
  // 1. Check if the current route matches the project details pattern
    const isProjectDetail = useMatch("/:lang/projets/:url");

    // 2. Decide background based on the route match
    // If it's a project detail page -> Light background
    // For all other pages -> Dark background
    const bgClass = isProjectDetail ? "bg-[url(/texture/paper-light-gray.png)]" : "bg-[url(/texture/paper-blue.png)]";
    const ComponentTop = isProjectDetail ? <SectionTop pageIsLight={isProjectDetail} /> : <Header isLight={isProjectDetail} />;

  return (
    <>
    <div className={`m-0 min-h-screen text-center
    flex flex-col items-center
    ${bgClass} bg-center bg-repeat`}>
      {ComponentTop}
      <main className="w-282 mt-0">
        <Outlet />
      </main>
    </div>
    
    </>
    
  )
}