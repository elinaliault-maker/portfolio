import { useParams } from "react-router"
import { getUiTranslation } from "../utils/getUiTranslation"
import PageTitleWithIcons from "../components/PageTitleWithIcons"

export default function Home() {
  const { lang } = useParams();
  const t = getUiTranslation(lang);

  return (
    <>
      <PageTitleWithIcons text={t.pagesTitle.about} />
      <p className="text-left">
        Le domaine artistique m'a toujours attirée : enfant, je participais déjà à des ateliers d'arts plastiques explorant différentes techniques, des supports variés et des sources d'inspiration multiples.
        <br /> Je me suis aussi ouverte à d'autres formes d'expression comme le théâtre dans une troupe de jeunes amateurs pendant 7 ans et la couture avec ma grand-mère.
        <br /> Parallèlement, j'ai suivi une scolarité réussie aimant à la fois les mathématiques, l'économie et les langues étrangères.
        <br /> C'est avec toutes ces expériences, je me suis orientée vers le métier de designer, me permettant ainsi d'exprimer ma créativité et mon ouverture au monde.
        <br /> Aujourd'hui, après la réalisation de mon DN Made, je vais poursuivre ma spécialisation en Bac+5 Expert en création numérique interactive aux Gobelins.
        <br />Je souhaite en effet devenir UX/UI designer afin de pouvoir accompagner par le design les utilisateurs de supports digitaux grâce à la réflexion sur le parcours et l’expérience utilisateur, l’ergonomie et le graphisme.
      </p>
    </>
  )
}