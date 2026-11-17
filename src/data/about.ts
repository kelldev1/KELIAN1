// Contenu du panneau "À propos". Modifie ces textes librement : le site se met à jour tout seul.
export const aboutParagraphs: string[] = [
  "Je suis développeur full-stack en formation à Paris : BTS SIO option SLAM à l'IPSSI, en alternance.",
  "Mon parcours part de la mécanique (Bac Pro), passe par les systèmes embarqués (BTS), puis arrive au code. De la mécanique, j'ai gardé une habitude : comprendre comment les pièces s'assemblent avant d'y toucher.",
  "J'aime construire d'abord la version la plus simple qui fonctionne, puis prendre le temps de la soigner.",
]

export const aboutFacts: ReadonlyArray<{ label: string; value: string }> = [
  { label: 'Lieu', value: 'Paris' },
  { label: 'Formation', value: 'BTS SIO SLAM · IPSSI' },
  { label: 'Rythme', value: 'Alternance' },
  { label: 'Outils', value: 'React, JavaScript, Node.js, SQL, Python' },
]

export const aboutPortrait = {
  src: '/images/portrait.png',
  alt: 'Portrait de Kelian Luye',
}
