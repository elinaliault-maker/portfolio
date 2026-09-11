import { useParams, useNavigate } from "react-router";
import { getProjects } from "../utils/getProjects";
import { getUiTranslation } from "../utils/getUiTranslation";
import { Button } from "../components/Button";
import ModuleRenderer from "../components/modules/ModuleRenderer";
import TableOfContents from "../components/TableOfContents";
import ProjectCard from "../components/ProjectCard";
import { ArrowUp } from 'lucide-react';

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

        <main className="flex-1 min-w-0 flex flex-col gap-5 mb-12
        text-(--marine)"
        style={{ "--project-mark-color": project.projectColor }}>
          <h1 className="text-3xl sm:text-4xl text-left">
            <span className="font-(family-name:--heading)">{project.title}</span>
            {" "} - <span dangerouslySetInnerHTML={{ __html: project.descriptionWithMark }} />
          </h1>
          {project.sections.map((block, i) => (
            <ModuleRenderer key={block.id || i} block={block} t={t} />
          ))}
          <OtherProjects lang={lang} t={t} projects={projects} currentUrl={projetUrl}/>
        </main>
      </div>
  );
}



function OtherProjects({ lang, t, projects, currentUrl }) {
// If there is only 1 project in total, there are no "other" projects to show
    if (projects.length <= 1) return null;

    const currentIndex = projects.findIndex((p) => p.url === currentUrl);

  // Calculate indices for circular wrapping
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;

    // Handle 2-project edge case vs 3+ projects cleanly without useless assignment
    const otherProjects = projects.length === 2
        ? projects.filter((p) => p.url !== currentUrl)
        : [projects[prevIndex], projects[nextIndex]];
    
    // The function to scroll back to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // smooth animation instead of an instant jump
      });
    };
    return (
        <section className="px-4 mt-52">
            <h4 className="w-fit px-1 m-0
            bg-(--marine) text-(--light-gray)
            text-lg font-(family-name:--heading) text-left mb-6">
                {t.projectDetail.otherProjects.title}
            </h4>

            {/* Project grid — same layout as the full Projects page */}
            <div className="grid grid-cols-2
            gap-12 md:gap-18 mb-20">
                {otherProjects.map((project, index) => (
                    <ProjectCard
                        key={project.url ?? index}
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

            {/* Button: centered below the grid */}
            <div className="flex justify-center mt-24">
                <Button
                    text={t.projectDetail.otherProjects.backToTop}
                    icon={ArrowUp}
                    variant="secondary"
                    textSize="small"
                    onClick={scrollToTop}
                />
            </div>
        </section>
    )
}