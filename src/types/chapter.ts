export type Theme =
  'cobalt' | 'paper' | 'ink' | 'chrome' | 'yellow' | 'violet' | 'neon' | 'mauve'

export type Chapter = {
  // Sert d'ancre dans l'URL (#parcours) et de clé React : doit être unique.
  id: string
  // Numéro affiché à la façon de la référence ("00", "01"...).
  number: string
  // Titre long affiché dans le chapitre.
  title: string
  // Libellé court affiché dans la navigation.
  navLabel: string
  // Couleurs du fond et des traits quand ce chapitre est à l'écran.
  theme: Theme
}

// Un écran de la frise horizontale : texte court affiché pendant que le trait avance.
export type StorySlide = {
  id: string // doit correspondre à l'id d'un chapitre
  kicker: string
  title: string
  text: string
  // Chemin de l'affiche affichée en fond pendant ce chapitre (dans public/).
  background: string
  link?: { label: string; url: string }
}
