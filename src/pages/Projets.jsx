import { useParams, Link } from "react-router"
// import ContentProjects from "../content/projets-fr.json"
import { getProjects } from "../utils/getProjects"
import { getUiTranslation } from "../utils/getUiTranslation"
import List from "../components/List"
// import PageTitleWithIcons from "../components/PageTitleWithIcons"

// Component to render a single project
function ProjectBlock ({ langUrl, projectUrl, coverUrl, title, detail, types }) {
    return (
        <Link 
            to={`/${langUrl}/projets/${projectUrl}`}
            className="group flex flex-col justify-start cursor-pointer no-underline text-inherit
            bg-[url(/texture/paper-light-gray.png)] bg-center bg-repeat
            shadow-(--shadow)
            rounded-[1px] border-2 border-(--text)/80 rotate-359"
        >
            <div className="w-auto aspect-3/2 overflow-hidden">
                <div 
                    style={{ backgroundImage: `url(${coverUrl})` }} 
                    className="w-full h-full bg-cover bg-center 
                    transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:mix-blend-luminosity"
                />
            </div>
            <div className="flex flex-col gap-1.5 justify-start
            p-2 border-t-2 border-(--text)/80">
                <h3 className="text-left m-0 text-(--bleu-clair) 
                transition-colors duration-300 group-hover:text-(--violet)">{title}</h3>
                <List textArray={[detail]} />
                {/* Loop through each type to create individual tags */}
                <div className="flex flex-wrap gap-2">
                    {types.map((type, tagIndex) => (
                        <span 
                            key={tagIndex} 
                            className="px-2 py-1 text-xs font-medium rounded-lg 
                            border border-(--blue-clair) text-(--text) 
                            transition-all duration-300 group-hover:border-(--violet) group-hover:text-(--violet)"
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>
            
        </Link>
    )
}

export default function Projects() {
    // 1. Grab current language from URL
    const { lang } = useParams();
    // 2. Get the correct JSON array
    const t = getUiTranslation(lang);
    const projects = getProjects(lang);

    return (
        <>
            {/* <PageTitleWithIcons text={t.pagesTitle.projects} /> */}
            <div className="bg-[url(/texture/paper-light-gray.png)] bg-center bg-repeat
            shadow-(--shadow) inline-block
            py-1 px-2 rounded-[1px] w-fit mb-10 rotate-358 border-2 border-(--text)/80">
                <h1 className="w-fit m-0 text-(--text)">{t.pagesTitle.projects}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Mapping over the JSON array to generate a block for each project */}
                {projects.map((project) => (
                    <ProjectBlock 
                        key={project.projectNumber} // Always provide a unique key in React lists
                        langUrl={lang}
                        projectUrl={project.url}
                        coverUrl={project.coverUrl} 
                        title={project.title} 
                        detail={project.detail}
                        types={project.types} 
                    />
                ))}
            </div>
        </>
    )
}