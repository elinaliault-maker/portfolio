import { useParams } from "react-router"
import { getUiTranslation } from "../utils/getUiTranslation"
import PageTitleWithIcons from "../components/PageTitleWithIcons"

export default function Home() {
  const { lang } = useParams();
  const t = getUiTranslation(lang);

  return (
    <>
      <PageTitleWithIcons text={t.pagesTitle.contact} />
    </>
  )
}