import { useParams, Link } from "react-router";
// import ContentProjets from "../content/projets-fr.json";
import { getProjects } from "../utils/getProjects";

export default function DetailProject() {
    // 1. Grab the ':projetUrl' out of the current URL string
    const { lang, projetUrl } = useParams();

    // Load the correct JSON file based on the URL language
    const projects = getProjects(lang);
    // 2. Find the object in your JSON array that matches this URL
    const project = projects.find(p => p.url === projetUrl);

    // 3. Handle 404 if someone types an URL that doesn't exist in the JSON
    if (!project) {
        return (
            <div className="p-6 text-center">
                <h2>Projet introuvable</h2>
                <Link to={`/${lang}/projets`} className="text-blue-500 underline">Retourner aux projets</Link>
            </div>
        );
    }

    // 4. Render your page fully dynamic from the found project data!
    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link to={`/${lang}/projets`} className="text-sm text-gray-500 hover:underline mb-6 inline-block">
                &larr; Retour aux projets
            </Link>

            <h1 className="text-4xl font-black mb-4">{project.title}</h1>
            
            <div className="flex gap-2 mb-6">
                {project.types.map((type, index) => (
                    <span key={index} className="px-2 py-1 text-xs border rounded">
                        {type}
                    </span>
                ))}
            </div>

            <img 
                src={project.coverUrl} 
                alt={project.title} 
                className="w-full h-96 object-cover rounded-lg mb-6" 
            />

            {/* You can easily add a "longDescription" or "bodyText" field to your JSON later to fill this space! */}
            <p className="text-lg text-gray-700 leading-relaxed">
                Bienvenue sur la page détaillée de {project.title}. Vous pouvez enrichir votre fichier JSON avec plus de clés de texte pour remplir automatiquement cette mise en page.
            </p>
        </div>
    );
}