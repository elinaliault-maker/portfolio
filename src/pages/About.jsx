import { useParams } from "react-router"
import { getUiTranslation } from "../utils/getUiTranslation"
import { getAbout } from "../utils/getAbout";
import PageTitleWithIcons from "../components/PageTitleWithIcons"
import { CollapseItem } from "../components/CollapseItem";

export default function Home() {
  const { lang } = useParams();
  const t = getUiTranslation(lang);
  const about = getAbout(lang);

  return (
    <>
      <PageTitleWithIcons text={t.pagesTitle.about} />
      {/* Presentation */}
      <div className="flex flex-col gap-4 justify-self-center mb-16">
        <div className="text-center w-70 h-70 rounded-xl bg-cover bg-[url(https://cdn.myportfolio.com/ff10bd09-4e02-4f96-b74a-01a590772b24/aec08532-24d2-4389-b242-8209fd782950.png?h=cb995b6b57d52c15ea63207b2fc27951)]"></div>
        
        <div className="flex flex-col gap-1.5">
            <h2 className="text-(--bleu-fonce)">{about.presentation.title} </h2>
            {about.presentation.paragraphs.map((text, index) => (
                <p key={index}>
                    {text}
                </p>
            ))}
        </div>
      </div>
      {/* Work */}
      <div className="flex flex-col gap-4 justify-self-center mb-32">
        <h2 className="text-(--bleu-fonce) mb-2">{about.work.title}</h2>

        <div className="flex flex-col w-2xl">
                {about.work.content.map((item, index) => (
                    <CollapseItem
                        key={item.id}
                        company={item.company}
                        role={item.role}
                        date={item.date}
                        description={item.description}
                        defaultOpen={index === 0} // Keeps the first item open by default like the photo!
                    />
                ))}
        </div>
      </div>
    </>
  )
}