import { NavLink, Link } from "react-router";
import Logo from "../assets/logo-portfolio-el.svg"

function HeaderLink({ text, url }) {
    return (
        <NavLink to={url} className="underline">{text}</NavLink>
    )
}

export default function Header() {
    return (
        <div className="flex gap-4">
            <NavLink>Projets</NavLink>
            <HeaderLink text="Projets" url="/projets" />
            <NavLink>Garden</NavLink>
            <Link to="/" className='back-home'>
                <img src={Logo} alt="Logo" className="w-16" />
            </Link>
            <NavLink>About</NavLink>
            <NavLink>Contact</NavLink>
        </div>
    )
}