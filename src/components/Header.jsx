import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useParams } from "react-router";
import { getUiTranslation } from "../utils/getUiTranslation";
import { LanguageDropdown } from "./LanguageDropdown";
import { SquareArrowOutUpRight, Menu } from 'lucide-react';


function HeaderLogo({ lang }) {
    return(
        <Link to={`/${lang}/`} className="w-fit px-1 bg-(--marine) 
        text-(--light-gray) font-(family-name:--heading)">
            Elina Liault
        </Link>
    )
}

function HeaderLink({ text, url, end = false }) {
    return (
        <NavLink to={url} end={end} className={({ isActive }) => 
            `w-fit px-1 font-(family-name:--font-text) 
            ${isActive ? `text-(--light-gray) bg-(--marine)`
            : `text-(--marine) bg-none`}
            hover:bg-(--marine-clair) hover:text-(--marine)`
        }>{text}
        </NavLink>
    )
}
function HeaderOutsideLink({ text, url }) {
    return (
        <a href={url} target="_blank" className={ 
            `w-fit px-1 font-(family-name:--font-text) 
            text-(--marine) bg-none
            hover:bg-(--marine-clair) hover:text-(--marine)
            flex flex-row gap-1 items-center group`
        }>{text}
            <SquareArrowOutUpRight
                className="hidden group-hover:inline"
                size={12}
            />
        </a>
    )
}

export default function Header() {
    const { lang } = useParams();
    const t = getUiTranslation(lang);
    const [openMenu, setOpenMenu] = useState(null); // null | 'nav' | 'lang'

    const toggleNav = () => setOpenMenu(prev => prev === 'nav' ? null : 'nav');
    const toggleLang = () => setOpenMenu(prev => prev === 'lang' ? null : 'lang');
    const closeAll = () => setOpenMenu(null);

    return (
        <nav className="z-100 w-full py-6 text-base relative">
            <div className="w-full grid grid-cols-2 justify-center items-center">
                <HeaderLogo lang={lang} />

                <div className="flex gap-4 justify-end items-center">
                    {/* Desktop nav links — hidden below md */}
                    <div className="hidden md:flex gap-4 items-center">
                        <HeaderLink text={t.nav.home} url={`/${lang}/`} end />
                        <HeaderLink text={t.nav.projects} url={`/${lang}/projets`} end />
                        <HeaderLink text={t.nav.about} url={`/${lang}/about`} />
                        <HeaderOutsideLink text={t.nav.curriculum.title} url={t.nav.curriculum.url} />
                    </div>

                    {/* Single LanguageDropdown instance, always visible, at every breakpoint */}
                    <LanguageDropdown
                        isOpen={openMenu === 'lang'}
                        onToggle={toggleLang}
                        onClose={closeAll}
                    />

                    {/* Hamburger — hidden at/above md */}
                    <button
                        className="md:hidden"
                        onClick={toggleNav}
                        aria-label="Toggle menu"
                        aria-expanded={openMenu === 'nav'}
                    >
                        <Menu className="text-(--marine)" size={18} />
                    </button>
                </div>
            </div>

            {openMenu === 'nav' && (
                <div className="md:hidden absolute right-0 mt-2.5
                flex flex-col gap-2 p-4 bg-(--light-gray) z-50
                border-2 border-(--marine-clair) shadow-(--shadow-marine)
                items-start w-fit text-sm">
                    <HeaderLink text={t.nav.home} url={`/${lang}/`} onClick={closeAll} />
                    <HeaderLink text={t.nav.projects} url={`/${lang}/projets`} onClick={closeAll} />
                    <HeaderLink text={t.nav.about} url={`/${lang}/about`} onClick={closeAll} />
                    <HeaderOutsideLink text={t.nav.curriculum.title} url={t.nav.curriculum.url} />
                </div>
            )}
        </nav>
    );
}