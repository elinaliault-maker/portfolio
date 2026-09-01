import { Link, useParams } from "react-router";
import { Mail, FileText } from "lucide-react";
import { getUiTranslation } from "../utils/getUiTranslation";

function LinkedinIcon({ size = 24, className = "", ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className={className}
            {...props}
        >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z"/>
        </svg>
    );
}
function IconLink({ icon: Icon, text, href, external = false }) {
    return (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="w-fit pr-1 flex items-center gap-2 
            text-(--light-gray) bg-none
            hover:text-(--marine) hover:bg-(--light-gray) transition-colors"
        >
            <Icon className="p-1 bg-(--light-gray) text-(--marine)" size={24} />
            {text}
        </a>
    );
}
function FooterLink({ text, url }) {
    return (
        <Link
            to={url}
            className="w-fit px-1
            text-(--light-gray) bg-none 
            hover:text-(--marine) hover:bg-(--light-gray) transition-colors"
        >
            {text}
        </Link>
    );
}

export default function Footer() {
    const { lang } = useParams();
    const t = getUiTranslation(lang);

    return (
        <footer className="w-screen bg-(--marine) border-2 border-(--marine-clair)
            px-8 sm:px-10 md:px-16 lg:px-60 xl:px-60 2xl:px-80
            py-10 md:py-12
            flex flex-col md:flex-row md:justify-between md:items-start
            gap-10 md:gap-6 text-left">

            {/* Logo + name + copyright */}
            <div className="flex flex-col gap-4">
                <img src="/star.svg" alt="" className="w-12 h-12" />
                <Link
                    to={`/${lang}/`}
                    className="w-fit px-1 bg-(--light-gray) hover:bg-(--marine-clair)
                    text-(--marine) font-(family-name:--heading) text-2xl"
                >
                    Elina Liault
                </Link>
                <p className="text-(--marine-clair) text-xs font-(family-name:--font-text)">
                    {t.footer.copyright}
                </p>
            </div>

            {/* Contact + Sitemap columns */}
            <div className="flex flex-row gap-16 sm:gap-24 md:gap-16 lg:gap-24 text-lg">
                <div className="flex flex-col gap-4 font-(family-name:--font-text)">
                    <h3 className="font-(family-name:--heading) text-(--marine-clair) 
                    text-xl">
                        {t.footer.contactTitle}
                    </h3>
                    <div className="flex flex-col gap-2">
                        <IconLink icon={Mail} text="elina.liault@gmail.com" href="mailto:elina.liault@gmail.com" />
                        <IconLink icon={LinkedinIcon} text="LinkedIn" href="https://www.linkedin.com/in/elina-liault-75427122a/" external />
                        <IconLink icon={FileText} text={t.nav.curriculum.title} href={t.nav.curriculum.url} external />
                    </div>
                </div>

                <div className="flex flex-col gap-4 font-(family-name:--font-text)">
                    <h3 className="font-(family-name:--heading) text-(--marine-clair) 
                    text-xl">
                        {t.footer.sitemapTitle}
                    </h3>
                    <div className="flex flex-col gap-2">
                        <FooterLink text={t.nav.home} url={`/${lang}/`} />
                        <FooterLink text={t.nav.projects} url={`/${lang}/projets`} />
                        <FooterLink text={t.nav.about} url={`/${lang}/about`} />
                    </div>
                    
                </div>
            </div>
        </footer>
    );
}