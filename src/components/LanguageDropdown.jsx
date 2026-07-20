import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

export function LanguageDropdown() {
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLang = lang || 'fr';

    // CDN flag image URLs (SVG format)
    const flags = {
        fr: { name: "Français", code: "fr", src: "https://flagcdn.com/fr.svg" },
        en: { name: "English", code: "gb", src: "https://flagcdn.com/gb.svg" }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (newLang) => {
        setIsOpen(false);
        if (newLang === currentLang) return;

        localStorage.setItem('user_lang', newLang);
        const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`);
        navigate(newPath);
    };

    return (
        <div className="relative font-(family-name:--sans)" ref={dropdownRef}>
            
            {/* CLOSED STATE: Perfectly round button with ONLY the current flag */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change Language"
                className="w-8 h-6 rounded-md bg-(--bg) border-2 border-(--bleu-fonce)/16 hover:border-(--bleu-clair) transition-all duration-300 cursor-pointer flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-(--bleu-fonce)"
            >
                <img 
                    src={flags[currentLang]?.src} 
                    alt={flags[currentLang]?.name} 
                    className="w-full h-full object-cover scale-100" // Scale clips flag into a perfect circle
                />
            </button>

            {/* OPEN STATE: Expanded menu showing flags + language text */}
            {isOpen && (
                <div 
                    className="absolute right-0 mt-1.5 w-auto bg-white border-2 border-(--bleu-fonce)/16 rounded-xl shadow-(--shadow) z-50 p-1.5 flex flex-col gap-1 transition-all duration-200"
                >
                    {Object.keys(flags).map((key) => {
                        const isSelected = currentLang === key;
                        return (
                            <button
                                key={key}
                                onClick={() => handleSelect(key)}
                                className={`flex items-center gap-1.75 w-full px-2 py-1.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                                    isSelected 
                                        ? 'bg-(--bleu-clair) text-(--bg)' 
                                        : 'text-(--text) hover:bg-(--bleu-clair)/16'
                                }`}
                            >
                                {/* Mini circular flag icon inside the dropdown list */}
                                <img 
                                    src={flags[key].src} 
                                    alt="" 
                                    className="w-7 h-5 rounded-md object-cover border border-(--bleu-fonce)/10 shrink-0" 
                                />
                                <span className="flex-1 text-left">{flags[key].name}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}