import { useParams, useNavigate } from "react-router";
import { getProjects } from "../utils/getProjects";
import { getUiTranslation } from "../utils/getUiTranslation";
import { Button } from "../components/Button";
import ModuleRenderer from "../components/modules/ModuleRenderer";
import TableOfContents from "../components/TableOfContents";

export default function CaseStudyPage() {
    // 1. Grab the ':projetUrl' out of the current URL string
    const { lang, projetUrl } = useParams();
    const navigate = useNavigate();
    // Load the correct JSON file based on the URL language
    const t = getUiTranslation(lang);
    const projects = getProjects(lang);
    // 2. Find the object in your JSON array that matches this URL
    const project = projects.find(p => p.url === projetUrl);

    // 3. Handle 404 if someone types an URL that doesn't exist in the JSON
    if (!project) {
        return (
            <div className="mt-12 p-6 text-center
            flex flex-col gap-5 items-center">
                <h2 className="text-xl text-(--state-red)
                font-(family-name:--heading)">{t.projectDetail.notFound.error}</h2>
                <Button
                  text={t.projectDetail.notFound.return}
                  variant="primary"
                  textSize="small"
                  to={`/${lang}/projets`}
                />
            </div>
        );
    }

  // only blocks with a label show up in the TOC
  const tocSections = project.sections.filter((s) => s.label);

  return (
      <div className="flex max-w-7xl gap-16 py-20">
        <aside className="w-fit pr-4 shrink-0 sticky top-24 h-fit
        hidden sm:block">
          <TableOfContents
            sections={tocSections}
            onBack={() => navigate(-1)}
            projectColor={project.projectColor}
          />
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-20 text-(--marine)">
          {project.sections.map((block, i) => (
            <ModuleRenderer key={block.id || i} block={block} />
          ))}
        </main>
      </div>
  );
}