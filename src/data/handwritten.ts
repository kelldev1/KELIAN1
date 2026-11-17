import { competences, realisations } from './btsSio'
import { email } from './contact'
import { skills } from './skills'
import { veilleSubject } from './veille'

// Textes écrits à la main sur chaque écran (un tableau = un paragraphe).
// Ils sont déduits des autres fichiers de data : modifier la source suffit.
export const parcoursLines: string[] = [
  '2019 – 2022 : Bac Pro Mécanique Générale, lycée Jean Rostand.',
  '2024 – 2025 : BTS Systèmes Embarqués au GARAC, puis réorientation vers l’informatique.',
  '2025 – 2027 : BTS SIO SLAM à l’IPSSI Paris, en alternance une semaine sur deux.',
  'Fév. – mai 2025 : Projet Kart, concepteur technique.',
  'Juin – juil. 2026 : Smart Moov, support et maintenance applicative.',
  'Nov. – déc. 2025 : Mission IPSSI, développeur front-end.',
]

export const competencesLines: string[] = skills.map(
  (skill) => `${skill.name} : ${skill.levelLabel.split(' — ')[0]}.`,
)

export const btsSioLines: string[] = [
  `Bloc 1 : ${realisations.length} réalisations pour ${competences.length} compétences.`,
  `${realisations.map((r) => r.name).join(', ')}.`,
  `Veille : ${veilleSubject.title}.`,
]

export const contactLines: string[] = [
  'Une question, une alternance ou un stage ? Écrivez-moi.',
  email,
  'GitHub : kelldev1. LinkedIn : kelian-luye.',
]
