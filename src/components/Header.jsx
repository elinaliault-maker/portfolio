import { NavLink, Link } from "react-router";
import { useParams } from "react-router";
import { getUiTranslation } from "../utils/getUiTranslation";
import Logo from "../assets/logo-portfolio-el.svg"
import { LanguageDropdown } from "./LanguageDropdown";

function HeaderLink({ text, url, isLight }) {
    const defaultTextColor = isLight ? "text-(--dark-text)" : "text-(--light-text)";
    const activeTextColor = isLight ? "text-(--dark-text)/60" : "text-(--light-text)/60";
    return (
        <NavLink to={url} className={({ isActive }) => 
            `font-(family-name:--sans) 
            ${isActive ? `${activeTextColor} underline underline-offset-1`
            : `${defaultTextColor} no-underline`}
            hover:${activeTextColor} hover:underline hover:underline-offset-1`
        }>{text}</NavLink>
    )
}

export default function Header({ isLight }) {
    const { lang } = useParams(); // Current language ('fr' or 'en')
    const t = getUiTranslation(lang);
    return (
        <nav className="z-100 w-282 grid grid-cols-2 justify-center items-center py-1">
            <Link to="/">
                <img src={Logo} alt="Logo" className="w-20" />
            </Link>
           
            <div className="flex gap-8 justify-end items-center">
                <HeaderLink text={t.nav.projects} url={`/${lang}/projets`} isLight={isLight} />
                {/* <HeaderLink text={t.nav.crafts} url={`/${lang}/crafts`} /> */}
                <HeaderLink text={t.nav.about} url={`/${lang}/about`} isLight={isLight} />
                <HeaderLink text={t.nav.contact} url={`/${lang}/contact`} isLight={isLight} />
                <LanguageDropdown />
            </div>
        </nav>
    )
}