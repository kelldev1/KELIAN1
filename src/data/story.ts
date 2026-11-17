import type { StorySlide } from '../types/chapter'
import { email } from './contact'

// Un écran par chapitre, dans le même ordre que chapters.ts
// (la navbar, les thèmes et les ancres en dépendent).
const POSTER_BLUE = ''
const POSTER_CHROME = ''
const POSTER_YELLOW = ''
const POSTER_VIOLET = ''
const POSTER_NEON = ''
const POSTER_MAUVE = ''
const POSTER_ART = ''

export const storySlides: StorySlide[] = [
  {
    id: 'debut',
    background: POSTER_BLUE,
    kicker: 'Paris · BTS SIO SLAM',
    title: 'Kelian Luye',
    text: 'Développeur full-stack. Penser en systèmes. Concevoir avec soin.',
  },
  {
    id: 'a-propos',
    background: POSTER_CHROME,
    kicker: 'À propos',
    title: 'Comprendre avant de toucher.',
    text: "J'aime construire d'abord la version la plus simple qui fonctionne, puis prendre le temps de la soigner.",
  },
  {
    id: 'parcours',
    background: POSTER_ART,
    kicker: 'Parcours',
    title: 'De la mécanique au code.',
    text: "Bac Pro Mécanique, BTS Systèmes Embarqués, puis BTS SIO SLAM à l'IPSSI Paris, en alternance.",
  },
  {
    id: 'competences',
    background: POSTER_YELLOW,
    kicker: 'Compétences',
    title: 'Sept outils, une méthode.',
    text: 'React, JavaScript, HTML/CSS, Node.js, SQL, API REST et Python : du front à la base de données.',
  },
  {
    id: 'projets',
    background: POSTER_VIOLET,
    kicker: 'Projets',
    title: 'Cinq projets concrets.',
    text: 'eBoutique, devmah, Quasar, reiim et tracer : du PHP MVC fait maison à une application React avec IA.',
  },
  {
    id: 'bts-sio',
    background: POSTER_NEON,
    kicker: 'BTS SIO & veille',
    title: 'Preuves et veille.',
    text: "Le tableau de synthèse du Bloc 1 et ma veille sur l'IA dans les systèmes embarqués.",
  },
  {
    id: 'contact',
    background: POSTER_MAUVE,
    kicker: 'Contact',
    title: 'Parlons-en.',
    text: 'Une question, une alternance ou un stage ? Écrivez-moi.',
    link: { label: 'Écrire un mail', url: `mailto:${email}` },
  },
]
