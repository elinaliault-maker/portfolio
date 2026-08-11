// TableOfContents.jsx
import { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";

export default function TableOfContents({ sections, onBack }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top that's currently intersecting
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" } // triggers when section is near top of viewport
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="flex flex-col gap-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
      >
        {/* <ArrowLeft size={16} />  */}
        <span 
            className="font-icon shrink-0  text-[0.5rem]
            group-hover:text-(--turquoise) group-hover:translate-x-0.5 transition-all duration-300"
            aria-hidden="true"
        >
            {"\uf000"} {/* unicode arrow */}
        </span>
        Back
      </button>

      <ul className="flex flex-col gap-3 border-l border-gray-200">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block pl-4 -ml-px border-l-2 text-sm transition ${
                activeId === s.id
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}