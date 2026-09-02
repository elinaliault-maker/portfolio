import { useState } from "react";
import { Link } from "react-router";

function PlusGraphicIcon({ size = 24, className = "", ...props }) {
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
            <path d="M10.6411 23.2376C11.0151 23.7459 11.5101 24 12.1261 24C12.6981 24 13.1821 23.7459 13.5781 23.2376C13.9741 22.7514 14.1721 22.1215 14.1721 21.3481C14.1721 20.6409 13.8861 19.4033 13.3141 17.6354C12.7421 15.8674 12.4561 14.2873 12.4561 12.895V12.4641V11.5359C12.4561 9.92265 12.7531 8.24309 13.3471 6.49724C13.9411 4.72928 14.2381 3.44751 14.2381 2.65193C14.2381 1.85635 14.0401 1.21547 13.6441 0.729282C13.2481 0.243094 12.7641 0 12.1921 0C11.5981 0 11.1031 0.254144 10.7071 0.762431C10.3331 1.24862 10.1461 1.87845 10.1461 2.65193C10.1461 3.02762 10.2231 3.53591 10.3771 4.1768C10.5311 4.79558 10.7071 5.43646 10.9051 6.09945L11.4991 7.8895C11.6311 8.28729 11.7191 8.76243 11.7631 9.31492C11.8291 9.8453 11.8621 10.442 11.8621 11.105V11.5359V12.4641C11.8621 14.1436 11.5651 15.8453 10.9711 17.5691C10.3771 19.2486 10.0801 20.5083 10.0801 21.3481C10.0801 22.0994 10.2671 22.7293 10.6411 23.2376Z"/>
            <path d="M0.762434 10.813C0.254147 11.187 -6.25072e-08 11.682 -8.94334e-08 12.298C-1.14436e-07 12.87 0.254146 13.354 0.762434 13.75C1.24862 14.146 1.87845 14.344 2.65194 14.344C3.35912 14.344 4.59669 14.058 6.36464 13.486C8.1326 12.914 9.71271 12.628 11.105 12.628L11.5359 12.628L12.4641 12.628C14.0773 12.628 15.7569 12.925 17.5028 13.519C19.2707 14.113 20.5525 14.41 21.3481 14.41C22.1436 14.41 22.7845 14.212 23.2707 13.816C23.7569 13.42 24 12.936 24 12.364C24 11.77 23.7459 11.275 23.2376 10.879C22.7514 10.505 22.1215 10.318 21.3481 10.318C20.9724 10.318 20.4641 10.395 19.8232 10.549C19.2044 10.703 18.5635 10.879 17.9006 11.077L16.1105 11.671C15.7127 11.803 15.2376 11.891 14.6851 11.935C14.1547 12.001 13.558 12.034 12.895 12.034L12.4641 12.034L11.5359 12.034C9.85635 12.034 8.1547 11.737 6.43094 11.143C4.75138 10.549 3.49171 10.252 2.65194 10.252C1.90055 10.252 1.27072 10.439 0.762434 10.813Z"/>
        </svg>
    );
}
function RelatedProjectChip({ label, url }) {
    const classes = `w-fit px-1 text-sm sm:text-base
        bg-(--marine)/84 text-(--light-gray)
        hover:bg-(--marine-clair) hover:text-(--marine) transition-colors`;
    const classesDisable = `w-fit px-1 text-sm sm:text-base
        text-(--marine)`;

    if (!url) {
        return <span className={classesDisable}>{label}</span>;
    }

    const isExternal = /^https?:\/\//.test(url);

    if (isExternal) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
                {label}
            </a>
        );
    }

    return (
        <Link to={url} className={classes}>
            {label}
        </Link>
    );
}

export function CollapseItem({
    icon,
    title,
    subtitle,
    date,
    description,
    relatedProjects = [],
    ToggleIcon = PlusGraphicIcon,
    defaultOpen = false,
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="w-full border-b-2 border-(--border) last:border-b-0 
        font-(family-name:--font-text) transition-colors">
            {/* Header Clickable Area */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-3 py-3 sm:px-4 sm:py-4 
                text-left flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4
                justify-between items-center
                cursor-pointer group focus:outline-none
                hover:bg-(--marine-clair)
                ${isOpen ? "bg-(--mc-50)" : "bg-none"}`}
            >
                {/* Left: optional icon + Title & Subtitle */}
                <div className="flex items-center gap-3 min-w-0">
                    {icon && (
                        <img src={icon} alt="" className="w-10 h-10 sm:w-13.5 sm:h-13.5 shrink-0 object-contain" />
                    )}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <h4 className="m-0 text-(--marine) text-base sm:text-xl font-(family-name:--heading)">
                            {title}
                        </h4>
                        <p className="m-0 text-sm sm:text-lg text-(--marine)">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Right: Date & Animated toggle icon */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="text-sm sm:text-base text-(--marine)">
                        {date}
                    </span>

                    {ToggleIcon ? (
                        <ToggleIcon
                            className={`transition-transform duration-300 text-(--marine) ${
                                isOpen ? "rotate-45" : "group-hover:rotate-20"
                            }`}
                            size={18}
                        />
                    ) : (
                        <span
                            className={`text-2xl text-(--marine) transition-transform duration-300 leading-none ${
                                isOpen ? "rotate-45" : "group-hover:rotate-20"
                            }`}
                            aria-hidden="true"
                        >
                            +
                        </span>
                    )}
                </div>
            </button>

            {/* Expandable Content Area using CSS Grid for smooth height animation */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] px-4 py-4 sm:px-8 sm:py-6 opacity-100 border-t border-(--marine-clair) bg-(--mc-50)"
                     : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden flex flex-col gap-3">
                    <p className="text-left m-0 text-sm sm:text-base text-(--marine)">
                        {description}
                    </p>

                    {relatedProjects.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {relatedProjects.map((project) => (
                                <RelatedProjectChip
                                    key={project.url ?? project.label}
                                    label={project.label}
                                    url={project.url}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}