import { useParams, Navigate, Outlet } from "react-router";

// List of supported languages in your portfolio
const SUPPORTED_LANGUAGES = ["fr", "en"];

export default function LanguageWrapper() {
    const { lang } = useParams();

    // 1. If the URL language isn't supported (e.g. /es/projets or /abc/projets), 
    // fallback to French automatically.
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        return <Navigate to="/fr/projets" replace />;
    }

    // 2. If the language is valid, render the matching child page 
    // (<Projets />, <DetailProjet />, etc.)
    return <Outlet />;
}