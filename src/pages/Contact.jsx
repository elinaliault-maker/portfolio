import { useParams } from "react-router"
import { getUiTranslation } from "../utils/getUiTranslation"
import PageTitle from "../components/PageTitle.jsx";

export default function Home() {
  const { lang } = useParams();
  const t = getUiTranslation(lang);

  return (
    <>
      <PageTitle text={t.pagesTitle.contact} />
    </>
  )
}