import type { Chapter } from '../types/chapter'

// Une seule source de vérité : la navbar et les sections lisent cette liste,
// donc ajouter un chapitre ici suffit à le faire apparaître partout.
export const chapters: Chapter[] = [
  { id: 'debut', number: '00', title: 'Début', navLabel: 'Début', theme: 'cobalt' },
  {
    id: 'a-propos',
    number: '01',
    title: 'À propos',
    navLabel: 'À propos',
    theme: 'chrome',
  },
  { id: 'parcours', number: '02', title: 'Parcours', navLabel: 'Parcours', theme: 'ink' },
  {
    id: 'competences',
    number: '03',
    title: 'Compétences',
    navLabel: 'Compétences',
    theme: 'yellow',
  },
  { id: 'projets', number: '04', title: 'Projets', navLabel: 'Projets', theme: 'violet' },
  {
    id: 'bts-sio',
    number: '05',
    title: 'BTS SIO & veille',
    navLabel: 'BTS SIO',
    theme: 'neon',
  },
  { id: 'contact', number: '06', title: 'Contact', navLabel: 'Contact', theme: 'mauve' },
]
