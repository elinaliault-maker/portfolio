import { Link, useParams } from "react-router"
import IndividualTag from "./IndividualTag"
import { getUiTranslation } from "../utils/getUiTranslation";

export default function ProjectCard({
    index,
    langUrl,
    projectUrl,
    coverUrl,
    isSchool = false,
    orgName,
    endDate,
    title,
    description,
    types,
}) {
    const { lang } = useParams();
    const t = getUiTranslation(lang);

    const meta = isSchool
        ? `${t.projects.card.isSchool}  ✽  ${orgName}  ✽  ${endDate}`
        : `${orgName}  ✽  ${endDate}`;

    return (
        <Link
            to={`/${langUrl}/projets/${projectUrl}`}
            className="group flex flex-col justify-start cursor-pointer no-underline 
            text-left"
        >
            {/* Index number */}
            <span className="text-sm sm:text-base text-(--marine) 
            font-(family-name:--font-text) mb-2">
                {String(index).padStart(2, "0")}
            </span>

            {/* Cover image */}
            <div className="w-full aspect-4/3 overflow-hidden relative
            bg-white">
                <div className="hidden group-hover:block bg-(--marine) mix-blend-screen 
                z-1 w-full h-full absolute top-0 left-0"></div>
                <div
                    style={{ backgroundImage: `url(${coverUrl})` }}
                    className="w-full h-full bg-cover bg-center
                    transition-transform duration-300 ease-in-out 
                    group-hover:scale-105 group-hover:saturate-0"
                />
            </div>

            {/* Meta / Title / Description / Tags */}
            <div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4">
                <p className="m-0 text-sm sm:text-lg text-(--marine) 
                font-(family-name:--font-text)">
                    {meta}
                </p>

                <h3 className="text-left mb-1 text-lg sm:text-2xl text-(--marine) 
                font-(family-name:--font-text)">
                    <span className="font-(family-name:--heading)">
                        {title}</span> – {description}
                </h3>

                <div className="flex flex-wrap gap-2">
                    {types.map((type, tagIndex) => (
                        <IndividualTag text={type} key={tagIndex} />
                    ))}
                </div>
            </div>
        </Link>
    )
}