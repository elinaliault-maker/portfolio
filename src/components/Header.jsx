import { NavLink, Link } from "react-router";
import Logo from "../assets/logo-portfolio-el.svg"

function HeaderLink({ text, url }) {
    return (
        <NavLink to={url} className={({ isActive }) => 
            `font-(family-name:--sans) 
            ${isActive ? "text-(--bleu-clair) underline underline-offset-1" 
            : "text-(--bleu-fonce) no-underline"}
            hover:text-(--bleu-clair) hover:underline hover:underline-offset-1`
        }>{text}</NavLink>
    )
}

export default function Header() {
    return (
        <nav className="grid grid-cols-2 justify-center items-center my-1">
            <Link to="/">
                <img src={Logo} alt="Logo" className="w-20" />
            </Link>
           
            <div className="flex gap-8 justify-end items-center">
                <HeaderLink text={"Projets"} url={"/projets"} />
                {/* <HeaderLink text={"Crafts"} url={"/crafts"} /> */}
                <HeaderLink text={"About"} url={"/about"} />
                <HeaderLink text={"Contact"} url={"/contact"} />
            </div>
        </nav>
    )
}