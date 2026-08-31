import { useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

export function LanguageDropdown({ isOpen, onToggle, onClose }) {
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const currentLang = lang || 'fr';

    const flags = {
        fr: { name: "Français", code: "fr", src: "https://flagcdn.com/fr.svg" },
        en: { name: "English", code: "gb", src: "https://flagcdn.com/gb.svg" }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleSelect = (newLang) => {
        onClose();
        if (newLang === currentLang) return;

        localStorage.setItem('user_lang', newLang);
        const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`);
        navigate(newPath);
    };

    return (
        <div className="relative font-(family-name:--sans)" ref={dropdownRef}>
            <button
                type="button"
                onClick={onToggle}
                aria-label="Change Language"
                className="w-7 h-5 bg-(--bg) 
                border-2 border-(--marine-clair)
                hover:border-(--marine) transition-all duration-300 cursor-pointer flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-(--marine) focus:border-none"
            >
                <img 
                    src={flags[currentLang]?.src} 
                    alt={flags[currentLang]?.name} 
                    className="w-full h-full object-cover scale-100"
                />
            </button>

            {isOpen && (
                <div 
                    className="absolute right-0 mt-2.5 w-auto bg-(--light-gray) border-2 border-(--marine-clair) 
                    shadow-(--shadow-marine) z-50 p-1.5 flex flex-col gap-1 transition-all duration-200"
                >
                    {Object.keys(flags).map((key) => {
                        const isSelected = currentLang === key;
                        return (
                            <button
                                key={key}
                                onClick={() => handleSelect(key)}
                                className={`flex items-center gap-1.5 w-full px-2 py-1.5 
                                    text-sm font-semibold transition-all cursor-pointer 
                                    ${isSelected 
                                        ? 'bg-(--marine) text-(--light-gray)' 
                                        : 'text-(--marine)'} 
                                        hover:bg-(--marine-clair) hover:text-(--marine)`}>
                                <img 
                                    src={flags[key].src} 
                                    alt="" 
                                    className="w-7 h-5 object-cover border border-(--marine) shrink-0" 
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