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
        <div className="header grid grid-cols-2 justify-center items-center w-auto my-1">
            <div className="w-max">
                 <Link to="/">
                    <img src={Logo} alt="Logo" className="w-20" />
                </Link>
            </div>
            <div className="flex gap-8 justify-end items-center w-auto">
                <HeaderLink text="Projets" url="/projets" />
                <HeaderLink text={"Garden"} url={"/garden"} />
                <HeaderLink text={"About"} url={"/about"} />
                <HeaderLink text={"Contact"} url={"/contact"} />
            </div>
        </div>
    )
}