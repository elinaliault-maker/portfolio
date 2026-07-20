import projectsFr from '../content/projets-fr.json';
import projectsEn from '../content/projets-en.json';

export function getProjects(lang) {
  if (lang === 'en') {
    return projectsEn;
  }
  return projectsFr; // Default to French
}