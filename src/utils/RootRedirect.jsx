import { Navigate } from "react-router";

export default function RootRedirect() {
    const savedLang = localStorage.getItem("user_lang") || "fr";
    return <Navigate to={`/${savedLang}`} replace />;
}