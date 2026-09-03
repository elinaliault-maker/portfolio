import { useState, useMemo } from "react"
import { useParams } from "react-router"
import { getProjects } from "../utils/getProjects"
import { getUiTranslation } from "../utils/getUiTranslation"
import ProjectCard from "../components/ProjectCard.jsx";

function FilterPill({ text, variant, onClick }) {
    const variants = {
        primary: `bg-(--marine) text-(--light-gray)
            border-2 border-(--marine) shadow-(--shadow-marine-clair)
            hover:shadow-none hover:translate-x-1 hover:translate-y-1`,
        secondary: `bg-(--marine-clair) text-(--marine)
            border-2 border-(--marine-clair) shadow-(--shadow-marine)
            hover:shadow-none hover:translate-x-1 hover:translate-y-1`,
    };
    const classes = `w-fit px-3 py-0.5 rounded-full
            flex items-center gap-2
            font-(family-name:--font-text) text-lg
            transition-all duration-200 ease-out
            cursor-pointer
            ${variants[variant]}`;
    return (
        <button
            type="button"
            onClick={onClick}
            className={classes}
        >
            {text}
        </button>
    );
}

export default function Projects() {
    const { lang } = useParams();
    const t = getUiTranslation(lang);
    const projects = getProjects(lang);

    const [activeFilter, setActiveFilter] = useState("all");

    // A project matches if any of its tags CONTAINS the filter word (case-insensitive)
    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return projects;

        const needle = activeFilter.toLowerCase();
        return projects.filter((project) =>
            project.types?.some((tag) =>
                tag.toLowerCase().split(/\s+/).includes(needle)
            )
        );
    }, [projects, activeFilter]);

    return (
        <>
            <div className="mt-16 flex flex-col items-center gap-6 mb-16">
                <div className="relative inline-block mt-2 mb-2">
                    <h1 className="font-(family-name:--heading)
                    text-(--marine) text-4xl sm:text-8xl text-center">
                        {t.pagesTitle.projects}
                    </h1>
                    <span 
                        className="text-[4rem] text-(--marine-clair) 
                        absolute -top-6.5 -right-8.5
                        rotate-[-16deg]"
                        aria-hidden="true"
                    >
                        ✽
                    </span>
                </div>

                <p className="max-w-208 text-center text-(--marine) text-lg">
                    {t.pagesSubtitle.projects}
                </p>

                {/* Filter bar */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 px-4">
                    <FilterPill
                        text={t.filters.all}
                        variant={activeFilter === "all" ? "primary" : "secondary"}
                        onClick={() => setActiveFilter("all")}
                    />
                    {t.filters.list.map((filter) => (
                        <FilterPill
                            key={filter}
                            text={filter}
                            variant={activeFilter === filter ? "primary" : "secondary"}
                            onClick={() => setActiveFilter(filter)}
                        />
                    ))}
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                gap-12 md:gap-18 mb-20">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.url ?? index}
                            index={index + 1}
                            langUrl={lang}
                            projectUrl={project.url}
                            coverUrl={project.coverUrl}
                            isSchool={project.isSchool}
                            orgName={project.orgName}
                            endDate={project.endDate} 
                            title={project.title} 
                            description={project.description}
                            types={project.types} 
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-(--state-red) mb-20 pt-2 text-lg">
                    {t.filters.noResults}
                </p>
            )}
        </>
    )
}