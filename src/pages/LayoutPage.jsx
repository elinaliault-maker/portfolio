import { Outlet } from "react-router";
import Header from "../components/Header";
import '../tailwind-import.css'
import '../index.css'

export default function LayoutPage() {
  return (
    <>
    <div className="m-0 min-h-screen text-center
    flex flex-col items-center
    bg-[url(/texture/paper-blue.png)] bg-center bg-repeat">
      <Header />
      <main className="w-282">
        <Outlet />
      </main>
    </div>
    
    </>
    
  )
}