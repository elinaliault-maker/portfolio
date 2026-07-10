import { NavLink, Link } from "react-router";

export default function Header() {
    return (
        <div>
            <NavLink>Projets</NavLink>
            <NavLink>Garden</NavLink>
            <Link to="/" className='back-home'>Logo/Home</Link>
            <NavLink>About</NavLink>
            <NavLink>Contact</NavLink>
        </div>
    )
}