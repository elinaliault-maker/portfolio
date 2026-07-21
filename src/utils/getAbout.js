import aboutFr from '../content/about-fr.json';
import aboutEN from '../content/about-en.json';

export function getAbout(lang) {
  if (lang === 'en') {
    return aboutEN;
  }
  return aboutFr; // Default to French
}