import { Link } from "react-router"
import IndividualTag from "./IndividualTag"

export default function ProjectCard ({ langUrl, projectUrl, coverUrl, title, detail, types }) {
    return (
        <Link 
            to={`/${langUrl}/projets/${projectUrl}`}
            className="group flex flex-col justify-start cursor-pointer no-underline text-inherit
            bg-[url(/texture/paper-light-gray.png)] bg-center bg-repeat
            shadow-(--shadow)
            rounded-[1px] border-2 border-(--dark-blue) rotate-359"
        >
            <div className="w-auto aspect-3/2 overflow-hidden relative">
                <div className="hidden group-hover:block bg-[#AA74FB] opacity-60 mix-blend-color z-1
                w-full h-full absolute top-0 left-0"></div>
                <div 
                    style={{ backgroundImage: `url(${coverUrl})` }} 
                    className="w-full h-full bg-cover bg-center 
                    transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:saturate-0"
                />
            </div>
            <div className="flex flex-col gap-1.5 justify-start
            p-2 border-t-2 border-(--dark-blue)">
                <h3 className="text-left m-0 text-(--sky-blue) 
                transition-colors duration-300 group-hover:text-(--turquoise)">{title}</h3>
                <p>{[detail]}</p>
                {/* Loop through each type to create individual tags */}
                <div className="flex flex-wrap gap-2">
                    {types.map((type, tagIndex) => (
                        <IndividualTag text={type} key={tagIndex}  />
                    ))}
                </div>
            </div>
            
        </Link>
    )
}