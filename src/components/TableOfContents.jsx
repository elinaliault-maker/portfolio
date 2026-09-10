import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

function handleTocClick(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // keep the URL in sync without letting the router intercept it
    window.history.pushState(null, "", `#${id}`);
  }
}

export default function TableOfContents({ 
  sections, 
  onBack,
  projectColor = "var(--marine-clair)" 
}) {
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
    <nav className="flex flex-col gap-7 text-left">
      <p className="text-5xl"
      style={{ color: `${projectColor}`}}>✽</p>
      <button
        onClick={onBack}
        className="w-fit px-1 flex items-center gap-1 text-sm text-(--marine)
        bg-none hover:bg-(--marine-clair) transition"
      >
        <ArrowLeft size={16} /> 
        Back
      </button>

      <ul className="flex flex-col gap-3">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => handleTocClick(e, s.id)}
              className={`block w-fit px-1 text-sm transition ${
                activeId === s.id
                  ? "bg-(--marine) text-(--light-gray) hover:bg-(--marine-clair) hover:text-(--marine)"
                  : "bg-none text-(--marine) hover:bg-(--marine-clair)"
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