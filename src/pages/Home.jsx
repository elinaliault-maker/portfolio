import { useParams } from "react-router"
import { getUiTranslation } from "../utils/getUiTranslation"

export default function Home() {
  const { lang } = useParams();
  const t = getUiTranslation(lang);

  return (
    <>
      <h1>{t.pagesTitle.home}</h1>
    </>
  )
}
