import { useState } from "react";

export function CollapseItem({ company, role, date, description, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b-2 border-(--border) py-4.5 font-(family-name:--sans) transition-colors">
            {/* Header Clickable Area */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-start cursor-pointer group focus:outline-none"
            >
                {/* Left Column: Company & Role */}
                <div className="flex flex-col gap-1">
                    <h4 className="m-0 text-(--bleu-clair) transition-colors group-hover:text-(--bleu-clair)/80">
                        {company}
                    </h4>
                    <p className="m-0 text-sm font-medium text-(--text)">
                        {role}
                    </p>
                </div>

                {/* Right Column: Date & Animated + / × Icon */}
                <div className="flex items-center gap-4 pt-1">
                    <span className="text-sm text-(--text)">
                        {date}
                    </span>
                    
                    {/* Plus icon that rotates 45 degrees to become an 'X' */}
                    <span 
                        className={`text-2xl font-medium text-(--text)/80 transition-transform duration-300 leading-none ${
                            isOpen ? "rotate-45" : "group-hover:text-(--text)/50"
                        }`}
                        aria-hidden="true"
                    >
                        +
                    </span>
                </div>
            </button>

            {/* Expandable Content Area using CSS Grid for smooth height animation */}
            <div 
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
            >
                <div className="overflow-hidden">
                    <p className="text-left m-0 text-sm leading-relaxed text-(--text) opacity-80">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}