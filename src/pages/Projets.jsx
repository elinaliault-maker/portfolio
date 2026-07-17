import { Link } from "react-router"
import ContentProjects from "../content/projets-fr.json"
import List from "../components/List"
import PageTitleWithIcons from "../components/PageTitleWithIcons"

// Component to render a single project
function ProjectBlock ({ projectUrl, coverUrl, title, detail, types }) {
    return (
        <Link 
            to={`/projets/${projectUrl}`}
            className="group flex flex-col gap-2 justify-start cursor-pointer no-underline text-inherit"
        >
            <div className="w-auto h-60 rounded-[0.5rem] overflow-hidden">
                <div 
                    style={{ backgroundImage: `url(${coverUrl})` }} 
                    className="w-full h-full bg-cover bg-center 
                    transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
            </div>
            <h2 className="text-left m-0 text-(--bleu-clair) 
            transition-colors duration-300 group-hover:text-(--violet)">{title}</h2>
            <List textArray={[detail]} />
            {/* Loop through each type to create individual tags */}
            <div className="flex flex-wrap gap-2">
                {types.map((type, tagIndex) => (
                    <span 
                        key={tagIndex} 
                        className="px-2 py-1 text-xs font-medium rounded-[0.5rem] 
                        border border-(--blue-clair) text-(--text) 
                        transition-all duration-300 group-hover:border-(--violet) group-hover:text-(--violet)"
                    >
                        {type}
                    </span>
                ))}
            </div>
        </Link>
    )
}

export default function Projects() {
    return (
        <>
            <PageTitleWithIcons text={"Projets"} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Mapping over the JSON array to generate a block for each project */}
                {ContentProjects.map((project) => (
                    <ProjectBlock 
                        key={project.projectNumber} // Always provide a unique key in React lists
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