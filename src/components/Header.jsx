import { NavLink, Link } from "react-router";
import { useParams } from "react-router";
import { getUiTranslation } from "../utils/getUiTranslation";
import Logo from "../assets/logo-portfolio-el.svg"
import { LanguageDropdown } from "./LanguageDropdown";

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
    const { lang } = useParams(); // Current language ('fr' or 'en')
    const t = getUiTranslation(lang);
    return (
        <nav className="z-100 grid grid-cols-2 justify-center items-center py-1 bg-(--bg)">
            <Link to="/">
                <img src={Logo} alt="Logo" className="w-20" />
            </Link>
           
            <div className="flex gap-8 justify-end items-center">
                <HeaderLink text={t.nav.projects} url={`/${lang}/projets`} />
                {/* <HeaderLink text={t.nav.crafts} url={`/${lang}/crafts`} /> */}
                <HeaderLink text={t.nav.about} url={`/${lang}/about`} />
                <HeaderLink text={t.nav.contact} url={`/${lang}/contact`} />
                <LanguageDropdown />
            </div>
        </nav>
    )
}