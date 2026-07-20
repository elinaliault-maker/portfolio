import uiFr from "../content/ui-fr.json";
import uiEn from "../content/ui-en.json";

export function getUiTranslation(lang) {
  if (lang === "en") {
    return uiEn;
  }
  return uiFr; // Default to French
}