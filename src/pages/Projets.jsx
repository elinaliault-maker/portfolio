import { useParams } from "react-router"
// import ContentProjects from "../content/projets-fr.json"
import { getProjects } from "../utils/getProjects"
import { getUiTranslation } from "../utils/getUiTranslation"
import ProjectCard from "../components/ProjectCard.jsx";

export default function Projects() {
    // 1. Grab current language from URL
    const { lang } = useParams();
    // 2. Get the correct JSON array
    const t = getUiTranslation(lang);
    const projects = getProjects(lang);

    return (
        <>
            <h1 className="font-(family-name:--heading)
            m-16 text-(--marine) text-4xl">{t.pagesTitle.projects}</h1>
            {/* <div className="bg-[url(/texture/paper-light-gray.png)] bg-center bg-repeat
            shadow-(--shadow) inline-block
            py-1 px-2 rounded-[1px] w-fit mb-10 rotate-358 border-2 border-(--text)/80">
                <h1 className="w-fit m-0 text-(--text)">{t.pagesTitle.projects}</h1>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            gap-12 md:gap-18 mb-20">
                {/* Mapping over the JSON array to generate a block for each project */}
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        index={index}
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
        </>
    )
}