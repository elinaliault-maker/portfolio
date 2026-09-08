import { useParams } from "react-router"
import { getUiTranslation } from "../utils/getUiTranslation"
import { getAbout } from "../utils/getAbout";
import { CollapseItem } from "../components/CollapseItem";
import { Button } from "../components/Button";
import { Download, Mail } from "lucide-react";
import IndividualTag from "../components/IndividualTag";

function AboutSectionTitle({ text }) {
  return (
    <h3 className="w-fit px-2 font-(family-name:--heading) text-3xl
    bg-(--marine) text-(--light-gray)">
      {text}
    </h3>
  )
}

export default function About() {
  const { lang } = useParams();
  const t = getUiTranslation(lang);
  const about = getAbout(lang);

  return (
    <>
      {/* Presentation */}
      <div className="w-full flex flex-row gap-12 md:gap-20 items-center my-24">
        <img src={about.presentation.HeroImg.src} 
        alt={about.presentation.HeroImg.alt} className="max-w-xs"/>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="font-(family-name:--heading) text-2xl md:text-3xl text-(--marine)">
            {about.presentation.sectionTitle}</h2>
          <p className="text-lg text-(--marine)">{about.presentation.paragraph}</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={Mail}  
            text={about.presentation.contactButton} href="mailto:elina.liault@gmail.com" />
            <Button variant="secondary" icon={Download}
            text={about.presentation.cvButton} href={t.nav.curriculum.url} />
            
          </div>
        </div>
        
      </div>
      {/* Skills */}
      <div className="w-full flex flex-col gap-4 justify-self-center mb-24">
        <AboutSectionTitle text={about.skills.sectionTitle} />
        <div className="w-full border-2 border-(--marine)">
          {about.skills.content.map((item, index) => (
              <div key={index} className="w-full p-4 
              border-b-2 border-(--border) last:border-b-0 text-left">
                <h4 className="font-(family-name:--heading) text-xl text-(--marine)
                mb-4">{item.title}</h4>
                <div className="w-full flex flex-wrap gap-4">
                  {item.tags.map((tag, i) => (
                      <IndividualTag
                          key={i}
                          text={tag}
                      />
                  ))}
                </div>
              </div>
          ))}
            
        </div>
      </div>
      {/* Work */}
      <div className="w-full flex flex-col gap-4 justify-self-center mb-24">
        <AboutSectionTitle text={about.work.sectionTitle} />
        <div className="w-full border-2 border-(--marine)">
            {about.work.content.map((item, index) => (
                <CollapseItem
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.subtitle}
                    date={item.date}
                    description={item.description}
                    relatedProjects={item.relatedProjects}
                    defaultOpen={index === 0} // Keeps the first item open by default like the photo!
                />
            ))}
        </div>
      </div>
      {/* school */}
      <div className="w-full flex flex-col gap-4 justify-self-center mb-24">
        <AboutSectionTitle text={about.school.sectionTitle} />
        <div className="w-full border-2 border-(--marine)">
            {about.school.content.map((item) => (
                <CollapseItem
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.subtitle}
                    date={item.date}
                    description={item.description}
                    relatedProjects={item.relatedProjects}
                />
            ))}
        </div>
      </div>
    </>
  )
}