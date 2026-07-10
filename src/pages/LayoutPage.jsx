import { Outlet } from "react-router";
import Header from "../components/Header";
import '../tailwind-import.css'
import '../index.css'

export default function LayoutPage() {
  return (
    <>
    <div className='general'>
      <Header />
      <main className="page">
        <Outlet />
      </main>
    </div>
    
    </>
    
  )
}